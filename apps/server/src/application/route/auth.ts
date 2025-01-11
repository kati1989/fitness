// src/routes/auth.ts
import { Hono } from "hono";
import { loginHandler, registerHandler, changePasswordHandler } from "../service/auth";

const auth = new Hono()
  .post("/login", loginHandler)
  .post("/register", registerHandler)
  .post("/change-password", changePasswordHandler);

export default auth;
