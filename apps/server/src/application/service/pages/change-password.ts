import { templatesPaths } from "@server/utils/templates-paths";
import { TemplateRendererFactory } from "../../../templates/TemplateRendererFactory";
import { Context } from "Hono";

export const getChangePasswordPageData = async (c: Context) => {
  const engineName = process.env.TEMPLATE_ENGINE || "ejs";
  const { header, templatesPath } = templatesPaths(engineName);

  const errors = c.req.query("errors")
    ? JSON.parse(decodeURIComponent(c.req.query("errors") as string))
    : [];
  const success =
    c.req.query("success") === "true" ? "Password changed successfully!" : null;

  const data = {
    title: "Change Your Password",
    errors,
    success,
    backHref: "http://localhost:5173/log-in",
    backTitle: "Log in",
    header,
  };

  const renderer = await TemplateRendererFactory.create(engineName);
  const filePath = `${templatesPath}/changePassword.${engineName}`;
  const html = renderer.render(filePath, data);

  return html;
};
