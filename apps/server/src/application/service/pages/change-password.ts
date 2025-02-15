import { templatesPaths } from "@server/utils/templates-paths";
import { TemplateRendererFactory } from "../../../templates/TemplateRendererFactory";
import { Context } from "Hono";
import { Constants } from "@server/utils/constants";

export const getChangePasswordPageData = async (c: Context) => {
  const engineName = process.env.TEMPLATE_ENGINE || "ejs";
  const { header, templatesPath } = templatesPaths(engineName);

  const errors = c.req.query(Constants.queryParams.ERRORS)
    ? JSON.parse(
        decodeURIComponent(c.req.query(Constants.queryParams.ERRORS) as string)
      )
    : [];
  const success =
    c.req.query(Constants.queryParams.SUCCESS) === "true"
      ? "Password changed successfully!"
      : null;

  const data = {
    title: "Change Your Password",
    errors,
    success,
    backHref: `${Constants.env.HOME_UI}/log-in`,
    backTitle: "Log in",
    header,
  };

  const renderer = await TemplateRendererFactory.create(engineName);
  const filePath = `${templatesPath}/changePassword.${engineName}`;
  const html = renderer.render(filePath, data);

  return html;
};
