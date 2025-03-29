import { Constants } from "@server/utils/constants";
import { generateJWT } from "@server/utils/jwt";
import { Context, MiddlewareHandler, Next } from "hono";
import { verify } from "hono/jwt";
import jwt from "jsonwebtoken";

export const authenticateJWT: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const tokenFromHeader = c.req.header("Authorization");

  if (!tokenFromHeader) {
    return c.json({ error: "Missing token" }, 401);
  }

  try {
    const token = tokenFromHeader.split(" ")[1];
    const authenticatedUser = await verify(token, Constants.env.JWT_SECRET!);
    c.set("user", authenticatedUser);
    return await next();
  } catch (error) {
    if ((error as jwt.TokenExpiredError).name === "JwtTokenExpired") {
      try {
        const decodedPayload = jwt.verify(
          tokenFromHeader.split(" ")[1],
          Constants.env.JWT_SECRET!,
          {
            ignoreExpiration: true,
          }
        ) as { id: string; email: string };

        if (!decodedPayload || !decodedPayload.id) {
          return c.json({ error: "Invalid token" }, 401);
        }

        const newAccessToken = await generateJWT({
          id: decodedPayload.id,
          email: decodedPayload.email,
        });

        return c.json(
          { error: "Token expired", refresh: true, token: newAccessToken },
          401
        );
      } catch (refreshError) {
        return c.json({ error: "Failed to refresh token" }, 401);
      }
    }

    return c.json({ error: "Authentication error" }, 401);
  }
};

export const authenticateJWTFromBody: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const { authToken } = await c.req.parseBody();
  try {
    const authenticatedUser = await verify(
      authToken as string,
      Constants.env.JWT_SECRET!
    );
    c.set("user", authenticatedUser);
    await next();
  } catch (error) {
    if ((error as jwt.TokenExpiredError).name === "JwtTokenExpired") {
      return c.json({ error: "Token expired", refresh: true }, 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      return c.json({ error: "Invalid token" }, 401);
    } else {
      return c.json({ error: "Authentication error" }, 401);
    }
  }
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
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return c.redirect(
          `${Constants.env.HOME_UI}/log-in?error=Token expired`
        );
      } else if (error instanceof jwt.JsonWebTokenError) {
        return c.redirect(
          `${Constants.env.HOME_UI}/log-in?error=Invalid token`
        );
      } else {
        return c.redirect(
          `${Constants.env.HOME_UI}/log-in?error=Authentication error`
        );
      }
    }
  } else {
    await authenticateJWT(c, next);
  }
};
