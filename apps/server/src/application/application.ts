import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRoutes from "./route/auth";
import { errorHandler } from "./middleware/errorHandler";
import gymRoutes from "./route/gym";
import pagesRoutes from "./route/pages";

export const createApp = () => {
  const app = new Hono();

  app.use("*", cors()).use("*", logger()).use("*", errorHandler);

  const routes = app
    .route("/auth", authRoutes)
    .route("/gym", gymRoutes)
    .route("/page", pagesRoutes);

  return { app, routes };
};
export type AppType = Awaited<ReturnType<typeof createApp>>["routes"];
