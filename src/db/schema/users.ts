import { sql } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";



export const users = sqliteTable('users', {
  id: integer('id').notNull().primaryKey(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  email: text('email').notNull().unique(),
  admin: integer('admin', { mode: 'boolean'}).notNull(),
  superadmin: integer('superadmin', { mode: 'boolean'}).notNull(),
});


// id
// name
// surname
// email
// admin
// superadmin