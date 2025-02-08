import pug from "pug";
import path from "path";
import { TemplateRenderer } from "../TemplateRenderer";

export default class PugRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const templateDir = path.dirname(templatePath); // Get the directory of the template

    return pug.renderFile(templatePath, {
      ...data,
      basedir: templateDir, // Ensures Pug can find partials
    });
  }
}
