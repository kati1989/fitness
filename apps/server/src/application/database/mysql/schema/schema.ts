import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
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

export const userMembershipSchema = mysqlTable("user_membership", {
  id: varchar("id", { length: 255 }).primaryKey(),
  user_id: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  membership_id: varchar("membership_id", { length: 255 })
    .notNull()
    .references(() => gymMembershipSchema.id),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const gymMembershipSchema = mysqlTable("gym_membership", {
  id: varchar("id", { length: 255 }).primaryKey(),
  gym_id: varchar("gym_id", { length: 255 })
    .notNull()
    .references(() => gymSchema.id),
  type: varchar("type", { length: 50 }).notNull(),
  monthly_price: int("monthly_price").notNull(),
  yearly_price: int("yearly_price").notNull(),
  description: text("description"),
  short_description: varchar("short_description", { length: 50 }),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const gymScoreSchema = mysqlTable("gym_score", {
  id: varchar("id", { length: 255 }).primaryKey(),
  gym_id: varchar("gym_id", { length: 255 })
    .notNull()
    .references(() => gymSchema.id),
  user_id: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  score: int("score").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default class MySQLSchema implements DatabaseSchema {
  userInfoSchema = userInfoSchema;
  gymSchema = gymSchema;
  gymScoreSchema = gymScoreSchema;
  userSchema = userSchema;
  userMembershipSchema = userMembershipSchema;
  gymMembershipSchema = gymMembershipSchema;
}
