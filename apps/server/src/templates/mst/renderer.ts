import mustache from "mustache";
import path from "path";
import fs from "fs";
import { TemplateRenderer } from "../TemplateRenderer";

export default class MstRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const template = fs.readFileSync(path.resolve(templatePath), "utf-8");

    // Load partials dynamically
    const partialsDir = path.join(path.dirname(templatePath), "partials");
    const partials: Record<string, string> = {};

    if (fs.existsSync(partialsDir)) {
      const partialFiles = fs.readdirSync(partialsDir);

      for (const file of partialFiles) {
        const partialName = path.basename(file, ".mst");
        const partialPath = path.join(partialsDir, file);
        partials[partialName] = fs.readFileSync(partialPath, "utf-8");
      }
    }

    return mustache.render(template, data, partials);
  }
}
