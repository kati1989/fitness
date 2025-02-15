import { Hono } from "hono";
import {
  changePasswordPageHandler,
  settingsPageHandler,
} from "@server/service/page";
import { authenticateJWT } from "@server/middleware/authMiddleware";
import { cors } from "hono/cors";

const pagesRoutes = new Hono()
  .get("/change-password", changePasswordPageHandler)
  .get("/settings", settingsPageHandler);

export default pagesRoutes;
