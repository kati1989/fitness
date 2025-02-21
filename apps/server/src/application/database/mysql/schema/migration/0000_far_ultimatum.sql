CREATE TABLE `gym` (
	`id` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`location` varchar(255) NOT NULL,
	`image` varchar(255),
	`primary_phone_contact` varchar(15) NOT NULL,
	`primary_email_contact` varchar(40) NOT NULL,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `gym_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_info` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`role` varchar(50) NOT NULL,
	`profile_image` varchar(255),
	`about` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`firstname` varchar(50) NOT NULL,
	`lastname` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(65) NOT NULL,
	`reset_token` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `user_info` ADD CONSTRAINT `user_info_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;