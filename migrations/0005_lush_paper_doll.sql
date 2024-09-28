CREATE TABLE `points` (
	`id` integer PRIMARY KEY NOT NULL,
	`associated_house` text NOT NULL,
	`user_id` text NOT NULL,
	`points_gained` integer,
	`points_lost` integer,
	`event_description` text,
	FOREIGN KEY (`user_id`) REFERENCES `students`(`student_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `points_associated_house_unique` ON `points` (`associated_house`);--> statement-breakpoint
CREATE UNIQUE INDEX `points_user_id_unique` ON `points` (`user_id`);