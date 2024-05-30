import { type Config } from "drizzle-kit";

// NOTE: Migration fails. The error is:
// ➜  cloudflare-d1-trpc-api git:(main) ✗ bun run db:migrate
// $ sst shell drizzle-kit migrate
// drizzle-kit: v0.21.4
// drizzle-orm: v0.30.10
// No config path provided, using default path
// Reading config file '/Users/jackblanc/projects/cloudflare-d1-trpc-api/drizzle.config.ts'
//  Invalid input  Either "turso", "libsql", "better-sqlite" are available options for "--driver"
// ×  exit status 1
// error: script "db:migrate" exited with code 1

export default {
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
  out: "./drizzle",
} satisfies Config;
