import { drizzle } from "drizzle-orm";
import { createConnection as mysqlConnect } from "mysql2/promise";
import { Pool as PgPool } from "pg";
import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const dbEngine = process.env.DB_ENGINE;

  switch (dbEngine) {
    case "mysql":
      const mysqlConnection = await mysqlConnect({
        /* Configurare MySQL */
      });
      return drizzle(mysqlConnection);
    case "postgresql":
      const pgPool = new PgPool({
        /* Configurare PostgreSQL */
      });
      return drizzle(pgPool);
    case "mongodb":
      const mongoClient = new MongoClient(process.env.MONGO_URI!);
      await mongoClient.connect();
      return mongoClient.db();
    default:
      throw new Error("Bază de date nevalidă!");
  }
};

export default connectDatabase;
