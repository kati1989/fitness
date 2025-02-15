import { hc } from "hono/client";
import type { AppType } from "./application/application";

export { AppType };
export const ApiClient = (url: string, token: string | null) =>
  hc<AppType>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
