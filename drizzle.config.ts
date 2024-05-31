import { type Config } from "drizzle-kit";
import { Resource } from "sst";

export default {
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: Resource.CloudflareAccountId.value,
    databaseId: Resource.DatabaseId.value,
    token: Resource.CloudflareApiToken.value,
  },
  out: "./drizzle",
} satisfies Config;
