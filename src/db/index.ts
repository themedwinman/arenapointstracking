import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const turso = createClient({
  url: 'libsql://kingsway-themedwinman.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);
