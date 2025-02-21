import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { DatabaseSchema } from "@server/database/DatabaseSchema";

export const userSchema = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  firstname: varchar("firstname", { length: 50 }).notNull(),
  lastname: varchar("lastname", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 65 }).notNull(),
  reset_token: varchar("reset_token", { length: 100 }),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const userInfoSchema = mysqlTable("user_info", {
  id: varchar("id", { length: 255 }).primaryKey(),
  user_id: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  role: varchar("role", { length: 50 }).notNull(),
  profile_image: varchar("profile_image", { length: 255 }),
  about: text("about"),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const gymSchema = mysqlTable("gym", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  primary_phone_contact: varchar("primary_phone_contact", {
    length: 15,
  }).notNull(),
  primary_email_contact: varchar("primary_email_contact", {
    length: 40,
  }).notNull(),
  description: text("description"),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
export default class MySQLSchema implements DatabaseSchema {
  userInfoSchema = userInfoSchema;
  gymSchema = gymSchema;
  userSchema = userSchema;
}
