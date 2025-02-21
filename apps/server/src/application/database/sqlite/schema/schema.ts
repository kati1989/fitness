import { DatabaseSchema } from "@server/database/DatabaseSchema";
import { sql } from "drizzle-orm";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const userSchema = table("user", {
  id: t.text("id").primaryKey(),
  firstname: t.text("firstname").notNull(),
  lastname: t.text("lastname").notNull(),
  email: t.text("email").notNull().unique(),
  password: t.text("password").notNull(),
  reset_token: t.text("reset_token"),
  created_at: t
    .text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  updated_at: t.text("updated_at").default(sql`(current_timestamp)`),
});

export const gymSchema = table("gym", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
  location: t.text("location").notNull(),
  image: t.text("image"),
  primary_phone_contact: t.text("primary_phone_contact").notNull(),
  primary_email_contact: t.text("primary_email_contact").notNull(),
  description: t.text("description"),
  created_at: t
    .text("created_at")
    .default(sql`(current_timestamp)`)
    .notNull(),
  updated_at: t.text("updated_at").default(sql`(current_timestamp)`),
});

export default class SQLiteSchema implements DatabaseSchema {
  userInfoSchema = null;
  userSchema = userSchema;
  gymSchema = gymSchema;
}
