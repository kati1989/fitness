CREATE TABLE IF NOT EXISTS "gym" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gym_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
CREATE TABLE IF NOT EXISTS "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(65) NOT NULL,
	"reset_token" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
