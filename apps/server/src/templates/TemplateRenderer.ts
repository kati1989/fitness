export interface TemplateRenderer {
    render(templatePath: string, data: object): string;
  }