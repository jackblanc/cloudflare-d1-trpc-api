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
    const database = new sst.cloudflare.D1("Database");

    const trpc = new sst.cloudflare.Worker("Trpc", {
      url: true,
      handler: "src/index.ts",
      link: [database],
      environment: {
        CLOUDFLARE_DATABASE_ID: database.id,
        CLOUDFLARE_ACCOUNT_ID: sst.cloudflare.DEFAULT_ACCOUNT_ID,
        CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN!,
      }
    });
  
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
