import fs from "fs";
import path from "path";
import { DatabaseClient } from "./DatabseClient";
import { DatabaseSchema } from "./DatabaseSchema";

export class DatabaseClientFactory {
  static async create(
    databaseType: string
  ): Promise<{ client: DatabaseClient; schema: DatabaseSchema }> {
    try {
      const clientPath = path.resolve(
        `src/application/database/${databaseType}/client.ts`
      );
      const schemaPath = path.resolve(
        `src/application/database/${databaseType}/schema/schema.ts`
      );

      // Load client if exists
      if (fs.existsSync(clientPath)) {
        const { default: ClientClass } = await import(clientPath);
        const client = new ClientClass();

        if (typeof client.init === "function") {
          await client.init();
        }

        // Load schema if exists
        if (fs.existsSync(schemaPath)) {
          const { default: SchemaClass } = await import(schemaPath);
          const schema = new SchemaClass();
          return { client, schema };
        } else {
          throw new Error(`Schema for '${databaseType}' not found`);
        }
      } else {
        throw new Error(`Database client '${databaseType}' not found`);
      }
    } catch (err) {
      throw new Error(
        `Error loading database client and schema '${databaseType}': ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }
}
