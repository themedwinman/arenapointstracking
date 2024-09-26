import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { students } from "./students";

export const points = sqliteTable('points', {
  id: integer('id').notNull().primaryKey(),
  associatedHouse: text('associated_house').notNull().unique(),
  associatedStudent: text('user_id').notNull().unique().references(() => students.studentId),
  pointsGained: integer('points_gained'),
  pointsLost: integer('points_lost'),
  event_description: text('event_description'),
});








// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// import { students } from "./students";

// export const points = sqliteTable('points', {
//   id: integer('id').notNull().primaryKey(),
//   associatedHouse: text('associated_house').notNull(), // Removed unique constraint
//   associatedStudent: text('user_id'), // Removed notNull constraint to make it optional
//   pointsGained: integer('points_gained'),
//   pointsLost: integer('points_lost'),
// });