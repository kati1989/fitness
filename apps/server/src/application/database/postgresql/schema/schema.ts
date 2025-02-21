import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
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

export default class PostgreSQLSchema implements DatabaseSchema {
  userInfoSchema = null;
  gymSchema = gymSchema;
  userSchema = userSchema;
}
