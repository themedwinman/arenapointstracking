import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { students } from "./students";

export const points = sqliteTable('points', {
  id: integer('id').notNull().primaryKey(),
  associatedHouse: text('associated_house').notNull().unique(),
  associatedStudent: text('user_id').notNull().unique().references(() => students.id),
  pointsGained: integer('points_gained'),
  pointsLost: integer('points_lost'),
});


// id
// associated house
// associated user
// points gained
// points lost

