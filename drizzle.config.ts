import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

require("dotenv").config();

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;