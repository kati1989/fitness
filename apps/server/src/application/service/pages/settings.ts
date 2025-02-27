import { templatesPaths } from "@server/utils/templates-paths";
import { TemplateRendererFactory } from "../../../templates/TemplateRendererFactory";
import { Context } from "Hono";
import { mapUserToUserForPage } from "@server/utils/user";
import { Constants } from "@server/utils/constants";
import { fetchUser } from "../user";

export const getSettingsPageData = async (c: Context) => {
  const backHref = c.req.query(
    Constants.queryParams.page.settings.BACK_HREF
  ) as string;

  const authToken = c.req.query(
    Constants.queryParams.page.settings.AUTH_TOKEN
  ) as string;
  const engineName = process.env.TEMPLATE_ENGINE || "ejs";
  const { templatesPath, header } = templatesPaths(engineName);

  const errors = c.req.query(Constants.queryParams.ERRORS)
    ? JSON.parse(
        decodeURIComponent(c.req.query(Constants.queryParams.ERRORS) as string)
      )
    : [];
  const success =
    c.req.query(Constants.queryParams.SUCCESS) === "true"
      ? "Settings updated successfully!"
      : null;

  const userInfo = await fetchUser(c);

  const userForPage = mapUserToUserForPage(userInfo);

  const data = {
    title: "User Settings",
    errors,
    success,
    backHref: backHref,
    backTitle: "Back",
    user: userForPage,
    header,
    authToken,
  };

  const renderer = await TemplateRendererFactory.create(engineName);
  const filePath = `${templatesPath}/settings.${engineName}`;
  const html = renderer.render(filePath, data);

  return html;
};
