// src/routes/auth.ts
import { Hono } from "hono";
import { loginHandler, registerHandler } from "../service/auth";

const auth = new Hono()
  .post("/login", loginHandler)
  .post("/register", registerHandler);

export default auth;
