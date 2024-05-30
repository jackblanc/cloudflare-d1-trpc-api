import { initTRPC } from "@trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
import { db } from "./db";
import { notes } from "./db/schema";

const t = initTRPC.context().create();

const router = t.router({
  list: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return db.select().from(notes)
    }),
  create: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      db.insert(notes).values( {id: Math.random() * 1000000, content: "Hello, world!" })
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