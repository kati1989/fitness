import { Hono } from "hono";
import {
  changePasswordPageHandler,
  settingsPageHandler,
} from "@server/service/page";
import { authenticateJWTWithQuery } from "@server/middleware/authMiddleware";

const pagesRoutes = new Hono()
  .get("/change-password", changePasswordPageHandler)
  .use("/settings", authenticateJWTWithQuery)
  .get("/settings", settingsPageHandler);

export default pagesRoutes;
