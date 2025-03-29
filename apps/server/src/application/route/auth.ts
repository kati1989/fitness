// src/routes/auth.ts
import { Hono } from "hono";
import {
  loginHandler,
  registerHandler,
  changePasswordHandler,
  logoutHandler,
  changeSettingsHandler,
} from "../service/auth";
import { authenticateJWTFromBody } from "@server/middleware/authMiddleware";

const auth = new Hono()
  .use("/change-settings", authenticateJWTFromBody)
  .post("/login", loginHandler)
  .post("/register", registerHandler)
  .post("/logout", logoutHandler)
  .post("/change-password", changePasswordHandler)
  .post("/change-settings", changeSettingsHandler);

export default auth;
