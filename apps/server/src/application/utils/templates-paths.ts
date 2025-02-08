import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const templatesPaths = (template: string) => {
  const templatesPath = path.resolve(__dirname, `../../templates/${template}`);
  const partialsPath = `${templatesPath}/partials`;
  const header = `${partialsPath}/header.${template}`;

  return {
    templatesPath,
    partialsPath,
    header,
  };
};
