CREATE TABLE `houses` (
	`id` integer PRIMARY KEY NOT NULL,
	`house_name` text NOT NULL,
	`house_colour` text NOT NULL,
	`house_total_points` integer
);
--> statement-breakpoint
CREATE TABLE `points` (
	`id` integer PRIMARY KEY NOT NULL,
	`associated_house` text NOT NULL,
	`user_id` text NOT NULL,
	`points_gained` integer,
	`points_lost` integer,
	FOREIGN KEY (`user_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`student_id` text NOT NULL,
	`house` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`email` text NOT NULL,
	`admin` integer NOT NULL,
	`superadmin` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `houses_house_name_unique` ON `houses` (`house_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `houses_house_colour_unique` ON `houses` (`house_colour`);--> statement-breakpoint
CREATE UNIQUE INDEX `points_associated_house_unique` ON `points` (`associated_house`);--> statement-breakpoint
CREATE UNIQUE INDEX `points_user_id_unique` ON `points` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `students_student_id_unique` ON `students` (`student_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);