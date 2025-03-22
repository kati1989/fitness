import { Constants } from "@server/utils/constants";
import { Context, MiddlewareHandler, Next } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

export const authenticateJWT: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const tokenFromHeader = c.req.header("Authorization");

  const authenticatedUser = await verify(
    tokenFromHeader!.split(" ")[1],
    Constants.env.JWT_SECRET!
  );

  c.set("user", authenticatedUser);
  await next();
};

export const authenticateJWTFromBody: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const { authToken } = await c.req.parseBody();
  const authenticatedUser = await verify(
    authToken as string,
    Constants.env.JWT_SECRET!
  );
  c.set("user", authenticatedUser);
  await next();
};

export const authenticateJWTWithQuery: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const secret = Constants.env.JWT_SECRET!;
  const token = c.req.query(Constants.cookies.AUTH_TOKEN);

  if (token) {
    try {
      const decoded = await verify(token, secret);
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
