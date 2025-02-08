import { Hono } from "hono";
import { TemplateRendererFactory } from "../../templates/TemplateRendererFactory";
import { templatesPaths } from "../utils/templates-paths";

const pagesRoutes = new Hono();

pagesRoutes.get("/change-password", async (ctx) => {
  try {
    const engineName = process.env.TEMPLATE_ENGINE || "ejs";
    const { header, templatesPath } = templatesPaths(engineName);

    const errors = ctx.req.query("errors")
      ? JSON.parse(decodeURIComponent(ctx.req.query("errors") as string))
      : [];
    const success =
      ctx.req.query("success") === "true"
        ? "Password changed successfully!"
        : null;

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

    return ctx.html(html);
  } catch (err) {
    console.error(err);
    return ctx.text("Error rendering template", 500);
  }
});

pagesRoutes.get("/settings", async (ctx) => {
  try {
    const engineName = process.env.TEMPLATE_ENGINE || "ejs";
    const { templatesPath, header } = templatesPaths(engineName);

    const errors = ctx.req.query("errors")
      ? JSON.parse(decodeURIComponent(ctx.req.query("errors") as string))
      : [];
    const success =
      ctx.req.query("success") === "true"
        ? "Settings updated successfully!"
        : null;

    const user = {
      username: "johndoe",
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

    return ctx.html(html);
  } catch (err) {
    console.error(err);
    return ctx.text("Error rendering template", 500);
  }
});

export default pagesRoutes;
