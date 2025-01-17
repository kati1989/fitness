// TemplateRendererFactory.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { TemplateRenderer } from "./TemplateRenderer";

export class TemplateRendererFactory {
  static async create(engineName: string): Promise<TemplateRenderer> {
    try {
      const enginePath = path.resolve(`src/templates/${engineName}/renderer.ts`);
      console.log(enginePath);

      if (fs.existsSync(enginePath)) {
        const { default: EngineClass } = await import(enginePath);
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
