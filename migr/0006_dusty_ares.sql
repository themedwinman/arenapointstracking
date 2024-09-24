-- Ensure the table and columns exist before creating indexes
CREATE UNIQUE INDEX `points_associated_house_unique` ON `points` (`associated_house`);
CREATE UNIQUE INDEX `points_user_id_unique` ON `points` (`user_id`);