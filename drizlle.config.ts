import "dotenv/config";
import type { Config } from "drizzle-kit";
console.log(process.env.TURSO_CONNECTION_URL);
export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
