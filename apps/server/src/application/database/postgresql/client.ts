import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DatabaseClient } from "../DatabseClient";
import { config } from "dotenv";

config();

export default class PostgreSQLClient implements DatabaseClient {
  dbCredentials: object = {
    host: process.env.POSTGRESQL_DB_HOST,
    port: parseInt(process.env.POSTGRESQL_DB_PORT!),
    user: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASS,
    database: process.env.DB_NAME,
    ssl: false,
  };
  connection: any;
  db: any;

  async init() {
    this.connection = await postgres(this.dbCredentials);
    this.db = drizzle({ client: this.connection });
  }
}
