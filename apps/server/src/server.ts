import { serve } from "@hono/node-server";
import { createApp } from "./application/application";

export const main = async () => {
  const { app } = await createApp();
  const port = 3000;

  console.log(`Server is running on https://localhost:${port}`);
  serve({ fetch: app.fetch, port });
};

void main();
