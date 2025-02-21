import type { Logger as drizzleLogger } from "drizzle-orm/logger";
import { config } from "dotenv";
import { DatabaseClientFactory } from "./DatabaseClientFactory";
config();

const DB_ERRORS = {
  DUPLICATE_KEY: "ER_DUP_ENTRY",
};

export interface DatabaseError {
  type: string;
  message: string;
  stack?: string;
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
}

let client;
const databaseType = process.env.DATABASE_TYPE as string;

const { client: dbClient, schema: dbSchema } =
  await DatabaseClientFactory.create(databaseType);

client = dbClient;

export type User = typeof userSchema.$inferSelect;
export type NewUser = typeof userSchema.$inferInsert;

export type UserInfo = typeof userInfoSchema.$inferSelect;
export type NewUserInfo = typeof userInfoSchema.$inferInsert;

export type Gym = typeof gymSchema.$inferSelect;
export type NewGym = typeof gymSchema.$inferInsert;

class DBLogger implements drizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    console.log(`SQL Query: ${query}`);
    console.log(`Parameters: ${JSON.stringify(params)}`);
  }
}

if (!databaseType) {
  throw new Error("DATABASE_TYPE is not set in environment variables.");
}

export const { connection, db, dbCredentials } = client;
export const { userSchema, gymSchema, userInfoSchema } = dbSchema;

export { DB_ERRORS };
