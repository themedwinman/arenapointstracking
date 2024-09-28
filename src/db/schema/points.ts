import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { students } from "./students";

export const points = sqliteTable('points', {
  id: integer('id').notNull().primaryKey(),
  associatedHouse: text('associated_house').notNull(),
  associatedStudent: text('user_id').references(() => students.studentId),
  pointsGained: integer('points_gained'),
  pointsLost: integer('points_lost'),
  event_description: text('event_description'),
});