import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { db } from "./db";
import { notes } from "./db/schema";

const t = initTRPC.context().create();

const router = t.router({
  list: t.procedure
    .query(() => {
      return db.select().from(notes)
    }),
  create: t.procedure
    .mutation(async () => {
      await db.insert(notes).values({ content: "Hello, world! Note: " + Math.random()   })
    }),
});

export type Router = typeof router;

export default {
  async fetch(request: Request): Promise<Response> {
    return fetchRequestHandler({
      router,
      req: request,
      endpoint: "/",
      createContext: (opts) => opts,
    });
  },
};