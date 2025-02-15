import { Context } from "hono";
import { getChangePasswordPageData } from "./pages/change-password";
import { getSettingsPageData } from "./pages/settings";
import { getCookie, setCookie } from "hono/cookie";

export const changePasswordPageHandler = async (c: Context) => {
  try {
    const html = await getChangePasswordPageData(c);
    return c.html(html);
  } catch (err) {
    console.error(err);
    return c.text("Error rendering template", 500);
  }
};

export const settingsPageHandler = async (c: Context) => {
  try {
    const html = await getSettingsPageData(c);
    return c.html(html);
  } catch (err) {
    console.error(err);
    return c.text("Error rendering template", 500);
  }
};
