import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { TemplateRenderer } from "../TemplateRenderer";

export default class HbsRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const templateDir = path.dirname(templatePath);
    const partialsDir = path.join(templateDir, "partials");

    if (fs.existsSync(partialsDir)) {
      const partialFiles = fs.readdirSync(partialsDir);

      for (const file of partialFiles) {
        const partialName = path.basename(file, ".hbs");
        const partialPath = path.join(partialsDir, file);
        const partialContent = fs.readFileSync(partialPath, "utf-8");

        handlebars.registerPartial(partialName, partialContent);
      }
    }

    const template = fs.readFileSync(path.resolve(templatePath), "utf-8");
    const compiledTemplate = handlebars.compile(template);

    return compiledTemplate(data);
  }
}
