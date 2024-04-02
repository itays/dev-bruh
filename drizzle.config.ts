import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./lib/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
