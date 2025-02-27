CREATE TABLE `user_membership` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`membership_id` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`price` varchar(50) NOT NULL,
	`price_type` varchar(50) NOT NULL,
	`description` text,
	`short_description` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_membership_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
RENAME TABLE `gym_plan` TO `gym_membership`;--> statement-breakpoint
ALTER TABLE `gym_membership` DROP FOREIGN KEY `gym_plan_gym_id_gym_id_fk`;
--> statement-breakpoint
ALTER TABLE `gym_membership` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `gym_membership` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `user_membership` ADD CONSTRAINT `user_membership_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_membership` ADD CONSTRAINT `user_membership_membership_id_gym_membership_id_fk` FOREIGN KEY (`membership_id`) REFERENCES `gym_membership`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `gym_membership` ADD CONSTRAINT `gym_membership_gym_id_gym_id_fk` FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`) ON DELETE no action ON UPDATE no action;