import { integer, sqliteTable } from "drizzle-orm/sqlite-core";



const table = sqliteTable('table', {
  id: integer('id')
});


// id
// house name
// house colour
// house total points