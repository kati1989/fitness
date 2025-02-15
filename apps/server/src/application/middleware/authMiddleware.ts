import { Constants } from "@server/utils/constants";
import { Context, MiddlewareHandler, Next } from "hono";
import { getSignedCookie } from "hono/cookie";
import { jwt, verify } from "hono/jwt";

export const authenticateJWT: MiddlewareHandler = jwt({
  secret: Constants.env.JWT_SECRET!,
});

export const authenticateJWTWithQuery: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const secret = Constants.cookies.AUTH_TOKEN;
  const token = c.req.query(Constants.cookies.AUTH_TOKEN);

  if (token) {
    try {
      const decoded = await verify(token, Constants.env.JWT_SECRET!);
      c.set("user", decoded);
      await next();
    } catch (err) {
      console.error(err);
      return c.redirect(`${Constants.env.HOME_UI}/log-in`);
    }
  } else {
    await authenticateJWT(c, next);
  }
};
