import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { DatabaseSchema } from "@server/database/DatabaseSchema";
import * as t from "drizzle-orm/pg-core";

export const userSchema = pgTable("user", {
  id: t.varchar({ length: 255 }).primaryKey(),
  firstname: t.varchar("firstname", { length: 50 }).notNull(),
  lastname: t.varchar("lastname", { length: 50 }).notNull(),
  email: t.varchar("email", { length: 100 }).notNull().unique(),
  password: t.varchar("password", { length: 65 }).notNull(),
  reset_token: t.varchar("reset_token", { length: 100 }),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
  updated_at: t.timestamp("updated_at"),
});

export const userInfoSchema = pgTable("user_info", {
  id: t.varchar("id", { length: 255 }).primaryKey(),
  user_id: t
    .varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  role: t.varchar("role", { length: 50 }).notNull(),
  profile_image: t.varchar("profile_image", { length: 255 }),
  about: text("about"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const gymSchema = pgTable("gym", {
  id: t.varchar({ length: 255 }).primaryKey(),
  name: t.varchar("name", { length: 100 }).notNull(),
  location: t.varchar("location", { length: 255 }).notNull(),
  image: t.varchar("image", { length: 255 }),
  primary_phone_contact: t
    .varchar("primary_phone_contact", {
      length: 15,
    })
    .notNull(),
  primary_email_contact: t
    .varchar("primary_email_contact", {
      length: 40,
    })
    .notNull(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const userMembershipSchema = pgTable("user_membership", {
  id: t.varchar("id", { length: 255 }).primaryKey(),
  user_id: t
    .varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  membership_id: t
    .varchar("membership_id", { length: 255 })
    .notNull()
    .references(() => gymMembershipSchema.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const gymMembershipSchema = pgTable("gym_membership", {
  id: t.varchar("id", { length: 255 }).primaryKey(),
  gym_id: t
    .varchar("gym_id", { length: 255 })
    .notNull()
    .references(() => gymSchema.id),
  type: t.varchar("type", { length: 50 }).notNull(),
  monthly_price: t.integer("monthly_price").notNull(),
  yearly_price: t.integer("yearly_price").notNull(),
  description: text("description"),
  short_description: t.varchar("short_description", { length: 50 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const gymScoreSchema = pgTable("gym_score", {
  id: t.varchar("id", { length: 255 }).primaryKey(),
  gym_id: t
    .varchar("gym_id", { length: 255 })
    .notNull()
    .references(() => gymSchema.id),
  user_id: t
    .varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  score: t.integer("score").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export default class PostgreSQLSchema implements DatabaseSchema {
  userInfoSchema = userInfoSchema;
  gymSchema = gymSchema;
  gymScoreSchema = gymScoreSchema;
  userSchema = userSchema;
  userMembershipSchema = userMembershipSchema;
  gymMembershipSchema = gymMembershipSchema;
}
