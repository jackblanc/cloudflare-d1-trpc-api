/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cloudflare-d1-trpc-api",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },
  async run() {
    const database = new sst.cloudflare.D1("Database")

    const databaseId = database.id.apply((id) => 
      new sst.Secret("DatabaseId", id)
    )

    const cloudflareAccountId = new sst.Secret("CloudflareAccountId", sst.cloudflare.DEFAULT_ACCOUNT_ID)
    const cloudflareApiToken = new sst.Secret("CloudflareApiToken", process.env.CLOUDFLARE_API_TOKEN)

    const trpc = new sst.cloudflare.Worker("Trpc", {
      url: true,
      handler: "src/index.ts",
      link: [databaseId, cloudflareAccountId, cloudflareApiToken]
    });

    const trpcServerUrl = trpc.url.apply(url => new sst.Secret("TrpcServerUrl", url))
  
    const client = new sst.cloudflare.Worker("Client", {
      url: true,
      link: [trpc],
      handler: "src/client.ts",
    });
  
    return {
      api: trpc.url,
      client: client.url,
    };
  }
});
