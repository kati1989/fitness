import type { Logger as drizzleLogger } from "drizzle-orm/logger";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import type { userSchema } from "../../../schema/schema";
import { config } from "dotenv";
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

export type User = typeof userSchema.$inferSelect;
export type NewUser = typeof userSchema.$inferInsert;

// Custom logger implementation
class DBLogger implements drizzleLogger {
  logQuery(query: string, params: unknown[]): void {
    console.log(`SQL Query: ${query}`);
    console.log(`Parameters: ${JSON.stringify(params)}`);
  }
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
const db = drizzle({ client: connection });

export { DB_ERRORS, connection, db };
