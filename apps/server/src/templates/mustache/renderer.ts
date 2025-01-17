import mustache from "mustache";
import path from "path";
import fs from "fs";
import { TemplateRenderer } from "../TemplateRenderer";

export default class PugRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const template = fs.readFileSync(path.resolve(templatePath), "utf-8");

    return mustache.render(template, data);
  }
}
