import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { DatabaseSchema } from "./DatabaseSchema";
import { DatabaseClient } from "./DatabseClient";

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

      const clientUrl = pathToFileURL(clientPath).href;
      const schemaUrl = pathToFileURL(schemaPath).href;

      if (fs.existsSync(clientPath)) {
        const { default: ClientClass } = await import(clientUrl);
        const client = new ClientClass();

        if (typeof client.init === "function") {
          await client.init();
        }

        if (fs.existsSync(schemaPath)) {
          const { default: SchemaClass } = await import(schemaUrl);
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
