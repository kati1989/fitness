import { MiddlewareHandler } from "hono";
import { jwt } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateJWT: MiddlewareHandler = jwt({
  secret: JWT_SECRET!,
});
