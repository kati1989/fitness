ALTER TABLE `gym_membership` CHANGE COLUMN `price` `monthly_price` VARCHAR(50);--> statement-breakpoint
ALTER TABLE `gym_membership` ADD `yearly_price` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `gym_membership` DROP COLUMN `subscription_type`;