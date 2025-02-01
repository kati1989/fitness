import { drizzle } from "drizzle-orm/better-sqlite3";
import { config } from "dotenv";
import { DatabaseClient } from "../DatabseClient";
import Database from "better-sqlite3";

config();

export default class SQLiteClient implements DatabaseClient {
  dbCredentials: object = {};
  connection: any;
  db: any;

  async init() {
    this.connection = { source: process.env.SQLITE_FILE_PATH };
    this.db = drizzle({ client: new Database("sqlite.db") });
  }
}
