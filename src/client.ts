import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Resource } from "sst";
import type { Router } from "./index";

export default {
  async fetch() {
    const client = createTRPCClient<Router>({
      links: [
        httpBatchLink({
          url: "http://localhost/",
          fetch(req) {
            return Resource.Trpc.fetch(req);
          },
        }),
      ],
    });

    client.create.mutate()

    return new Response(
      JSON.stringify(await client.list.query({
        name: "Patrick Star",
      }))
    );
  },
};