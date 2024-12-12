import { MiddlewareHandler } from "hono";

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    c.status(500);
    c.json({ error: "Internal Server Error" });
  }
};
