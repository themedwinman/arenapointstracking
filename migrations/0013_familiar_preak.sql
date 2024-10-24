CREATE TABLE `points` (
	`id` integer PRIMARY KEY NOT NULL,
	`associated_house` text NOT NULL,
	`user_id` integer,
	`points_gained` integer,
	`points_lost` integer,
	`event_description` text,
	FOREIGN KEY (`user_id`) REFERENCES `students`(`student_id`) ON UPDATE no action ON DELETE cascade
);
