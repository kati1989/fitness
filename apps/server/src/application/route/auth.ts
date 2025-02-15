// src/routes/auth.ts
import { Hono } from "hono";
import {
  loginHandler,
  registerHandler,
  changePasswordHandler,
  logoutHandler,
} from "../service/auth";

const auth = new Hono()
  .post("/login", loginHandler)
  .post("/register", registerHandler)
  .post("/logout", logoutHandler)
  .post("/change-password", changePasswordHandler);

export default auth;
