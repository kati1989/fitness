CREATE TABLE IF NOT EXISTS "gym_membership" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"gym_id" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"monthly_price" integer NOT NULL,
	"yearly_price" integer NOT NULL,
	"description" text,
	"short_description" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gym" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"location" varchar(255) NOT NULL,
	"image" varchar(255),
	"primary_phone_contact" varchar(15) NOT NULL,
	"primary_email_contact" varchar(40) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gym_score" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"gym_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"score" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_info" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"profile_image" varchar(255),
	"about" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_membership" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"membership_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(65) NOT NULL,
	"reset_token" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gym_membership" ADD CONSTRAINT "gym_membership_gym_id_gym_id_fk" FOREIGN KEY ("gym_id") REFERENCES "public"."gym"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gym_score" ADD CONSTRAINT "gym_score_gym_id_gym_id_fk" FOREIGN KEY ("gym_id") REFERENCES "public"."gym"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gym_score" ADD CONSTRAINT "gym_score_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_membership" ADD CONSTRAINT "user_membership_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_membership" ADD CONSTRAINT "user_membership_membership_id_gym_membership_id_fk" FOREIGN KEY ("membership_id") REFERENCES "public"."gym_membership"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
