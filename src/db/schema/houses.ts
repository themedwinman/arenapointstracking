import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";



export const houses = sqliteTable('houses', {
  id: integer('id').notNull().primaryKey(),
  houseName: text('house_name').notNull().unique(),
  houseColour: text('house_colour').notNull().unique(),
  houseTotalPoints: integer('house_total_points'),
});


// id
// house name
// house colour
// house total points