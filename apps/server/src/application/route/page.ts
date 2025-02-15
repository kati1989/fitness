import { Hono } from "hono";
import {
  changePasswordPageHandler,
  settingsPageHandler,
} from "@server/service/page";
import {
  authenticateJWT,
  authenticateJWTWithQuery,
} from "@server/middleware/authMiddleware";
import { cors } from "hono/cors";

const pagesRoutes = new Hono()
  .get("/change-password", changePasswordPageHandler)
  .use("/settings", authenticateJWTWithQuery)
  .get("/settings", settingsPageHandler);

export default pagesRoutes;
