CREATE TABLE `gym_score` (
	`id` varchar(255) NOT NULL,
	`gym_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`score` int NOT NULL,
	`comment` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `gym_score_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `gym_score` ADD CONSTRAINT `gym_score_gym_id_gym_id_fk` FOREIGN KEY (`gym_id`) REFERENCES `gym`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `gym_score` ADD CONSTRAINT `gym_score_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;