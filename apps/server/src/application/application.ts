import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRoutes from "./route/auth";
import { errorHandler } from "./middleware/errorHandler";
import gymRoutes from "./route/gym";
import pagesRoutes from "./route/page";
import userRoutes from "./route/user";

export const createApp = () => {
  const app = new Hono();

  app
    .use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    )
    .use("*", logger())
    .use("*", errorHandler);

  const routes = app
    .route("/auth", authRoutes)
    .route("/user", userRoutes)
    .route("/gym", gymRoutes)
    .route("/page", pagesRoutes);

  return { app, routes };
};
export type AppType = Awaited<ReturnType<typeof createApp>>["routes"];
