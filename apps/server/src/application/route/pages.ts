import { Hono } from "hono";
import { TemplateRendererFactory } from "../../templates/TemplateRendererFactory";

const pagesRoutes = new Hono();

pagesRoutes.get("/change-password", async (ctx) => {
  try {
    const engineName = process.env.TEMPLATE_ENGINE || 'ejs';

    console.log("process.env.TEMPLATE_ENGINE", process.env.TEMPLATE_ENGINE);
    console.log("engineName", engineName);

    const data = {
      title: "Change Your Password",
      errors: [],
      success: null,
      backHref: "http://localhost:5173/log-in",
      backTitle: "Log in"
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
