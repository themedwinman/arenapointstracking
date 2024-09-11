-- 0004_friendly_franklin_storm.sql
ALTER TABLE `students` RENAME COLUMN `student_id` TO `student_identification`;
DROP INDEX IF EXISTS `students_student_id_unique`;
CREATE UNIQUE INDEX `students_student_identification_unique` ON `students` (`student_identification`);