import ejs from "ejs";
import fs from "fs";
import path from "path";
import { TemplateRenderer } from "../TemplateRenderer";

export default class EjsRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const template = fs.readFileSync(path.resolve(templatePath), "utf-8");
    return ejs.render(template, data);
  }
}
