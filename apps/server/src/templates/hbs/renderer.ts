import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { TemplateRenderer } from "../TemplateRenderer";


export default class HbsRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const template = fs.readFileSync(path.resolve(templatePath), "utf-8");
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
  }
}