CREATE TABLE `gym_plan` (
	`id` varchar(255) NOT NULL,
	`gym_id` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`price` varchar(50) NOT NULL,
	`price_type` varchar(50) NOT NULL,
	`description` text,
	`short_description` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `gym_plan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `gym_plan` ADD CONSTRAINT `gym_plan_gym_id_gym_id_fk` FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`) ON DELETE no action ON UPDATE no action;