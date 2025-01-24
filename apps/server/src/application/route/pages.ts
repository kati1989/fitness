import { Hono } from "hono";
import { TemplateRendererFactory } from "../../templates/TemplateRendererFactory";

const pagesRoutes = new Hono();

pagesRoutes.get("/change-password", async (ctx) => {
  try {
    const engineName = process.env.TEMPLATE_ENGINE || "ejs";

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
    };

    const renderer = await TemplateRendererFactory.create(engineName);
    const templatePath = `src/templates/${engineName}/changePassword.${engineName}`;
    const html = renderer.render(templatePath, data);

    return ctx.html(html);
  } catch (err) {
    console.error(err);
    return ctx.text("Error rendering template", 500);
  }
});

export default pagesRoutes;
