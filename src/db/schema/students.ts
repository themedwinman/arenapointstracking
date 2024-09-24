import { NONAME } from "dns/promises";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { houses } from "@/helper/Util";


export const students = sqliteTable('students', {
  id: integer('id').notNull().primaryKey(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  studentId: text('student_id').notNull().unique(),
  house: text('house').notNull(),
});


// id
// name
// surname
// student id
// house