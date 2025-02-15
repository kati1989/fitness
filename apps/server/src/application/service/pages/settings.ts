import { templatesPaths } from "@server/utils/templates-paths";
import { TemplateRendererFactory } from "../../../templates/TemplateRendererFactory";
import { Context } from "Hono";

export const getSettingsPageData = async (c: Context) => {
  const engineName = process.env.TEMPLATE_ENGINE || "ejs";
  const { templatesPath, header } = templatesPaths(engineName);

  const errors = c.req.query("errors")
    ? JSON.parse(decodeURIComponent(c.req.query("errors") as string))
    : [];
  const success =
    c.req.query("success") === "true" ? "Settings updated successfully!" : null;

  const user = {
    firstname: "Pop",
    lastname: "Andrei",
    email: "johndoe@example.com",
    notificationsEnabled: true,
    theme: "dark",
  };

  const data = {
    title: "User Settings",
    errors,
    success,
    backHref: "/dashboard",
    backTitle: "Back to Dashboard",
    user,
    header,
  };

  const renderer = await TemplateRendererFactory.create(engineName);
  const filePath = `${templatesPath}/settings.${engineName}`;
  const html = renderer.render(filePath, data);

  return html;
};
