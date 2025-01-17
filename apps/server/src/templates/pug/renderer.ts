import pug from "pug";
import path from "path";
import { TemplateRenderer } from "../TemplateRenderer";

export default class PugRenderer implements TemplateRenderer {
  render(templatePath: string, data: object): string {
    const compiledFunction = pug.compileFile(path.resolve(templatePath));
    return compiledFunction(data);
  }
}
