import fs from "fs";
import path from "path";
import { pathToFileURL } from "url"; // Import this to convert paths to file:// URLs
import { TemplateRenderer } from "./TemplateRenderer";

export class TemplateRendererFactory {
  static async create(engineName: string): Promise<TemplateRenderer> {
    try {
      // Resolve the path to the engine
      const enginePath = path.resolve(`src/templates/${engineName}/renderer.ts`);
      const engineUrl = pathToFileURL(enginePath).href; // Convert to a file:// URL
      console.log(engineUrl); // Log the URL to debug

      if (fs.existsSync(enginePath)) {
        // Use file URL for dynamic import
        const { default: EngineClass } = await import(engineUrl);
        return new EngineClass();
      } else {
        throw new Error(`Template engine '${engineName}' not found`);
      }
    } catch (err) {
      throw new Error(
        `Error loading template engine '${engineName}': ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }
  }
}
