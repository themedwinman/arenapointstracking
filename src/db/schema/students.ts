import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


 

export const students = sqliteTable('students', {
    id: integer('id').notNull().primaryKey(),   // .autoIncrement(),
    name: text('name').notNull(),
    surname: text('surname').notNull(),
    studentId: text('student_id').notNull().unique(),
    house: text('house').notNull(),

});