import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Resource } from "sst";
import type { Router } from "./index";

export default {
  async fetch() {
    const client = createTRPCClient<Router>({
      links: [
        httpBatchLink({
          url: Resource.TrpcServerUrl.value,
          fetch(req) {
            return Resource.Trpc.fetch(req);
          },
        }),
      ],
    });

    await client.create.mutate()

    return new Response(
      JSON.stringify(await client.list.query())
    );
  },
};