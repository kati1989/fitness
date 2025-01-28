import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { DatabaseClient } from "../DatabseClient";
import { config } from "dotenv";

config();

export default class MySQLClient implements DatabaseClient {
  dbCredentials: object = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
  connection: any;
  db: any;

  async init() {
    this.connection = await mysql.createConnection(this.dbCredentials);

    this.db = drizzle({ client: this.connection });
  }
}
