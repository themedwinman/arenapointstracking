/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
DROP INDEX IF EXISTS `points_user_id_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `students_student_id_unique`;--> statement-breakpoint
ALTER TABLE `points` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `students` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `students` DROP COLUMN `student_id`;