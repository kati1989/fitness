import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const supportedDialects = ["mysql", "sqlite", "postgresql"] as const;
type SupportedDialect = (typeof supportedDialects)[number];

const databaseType = process.env.DATABASE_TYPE as SupportedDialect;

if (!databaseType) {
  throw new Error("DATABASE_TYPE is not defined in the environment variables.");
}

const config = {
  sqlite: {
    dialect: "sqlite" as const,
    dbCredentials: {
      url: process.env.SQLITE_FILE_PATH!,
    },
  },
  mysql: {
    dialect: "mysql" as const,
    dbCredentials: {
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!),
      user: process.env.DB_USER!,
      database: process.env.DB_NAME!,
    },
  },
  postgresql: {
    dialect: "postgresql" as const,
    dbCredentials: {
      host: process.env.POSTGRESQL_DB_HOST!,
      port: parseInt(process.env.POSTGRESQL_DB_PORT!),
      user: process.env.POSTGRESQL_DB_USER!,
      password: process.env.POSTGRESQL_DB_PASS!,
      database: process.env.DB_NAME!,
      ssl: false,
    },
  },
};

export default defineConfig({
  schema: `src/application/database/${databaseType}/schema/schema.ts`,
  out: `src/application/database/${databaseType}/schema/migration`,
  ...config[databaseType],
});
