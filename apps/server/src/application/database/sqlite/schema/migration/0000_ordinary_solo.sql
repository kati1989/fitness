CREATE TABLE `gym_membership` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`gym_id` text(255) NOT NULL,
	`type` text(50) NOT NULL,
	`monthly_price` integer NOT NULL,
	`yearly_price` integer NOT NULL,
	`description` text,
	`short_description` text(50),
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp),
	FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `gym` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`image` text,
	`primary_phone_contact` text NOT NULL,
	`primary_email_contact` text NOT NULL,
	`description` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp)
);
--> statement-breakpoint
CREATE TABLE `gym_score` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`gym_id` text(255) NOT NULL,
	`user_id` text(255) NOT NULL,
	`score` integer NOT NULL,
	`comment` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp),
	FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_info` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(255) NOT NULL,
	`role` text(50) NOT NULL,
	`profile_image` text(255),
	`about` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_membership` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(255) NOT NULL,
	`membership_id` text(255) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`membership_id`) REFERENCES `gym_membership`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`reset_token` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);