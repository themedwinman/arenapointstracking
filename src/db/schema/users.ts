import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: integer('id').notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  admin: integer('admin', { mode: 'boolean' }).notNull(),
  superadmin: integer('superadmin', { mode: 'boolean' }).notNull(),
  adminrequest: integer('adminrequest', { mode: 'boolean' }),
});
