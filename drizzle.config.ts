import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load .env.test in test environment, otherwise .env.local
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";
dotenv.config({ path: envFile });
// Fallback: if DATABASE_URL is still missing, try the other env file
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env.test" });
}
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env.local" });
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
