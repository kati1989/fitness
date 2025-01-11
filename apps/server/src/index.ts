import { hc } from "hono/client";
import type { AppType } from "./application/application";

export { AppType };
export const ApiClient = (url: string) => hc<AppType>(url);

export const changePassword = async (url: string, email: string, oldPassword: string, newPassword: string) => {
    const client = ApiClient(url);
    return client.auth.changePassword({
      method: "POST",
      body: { email, oldPassword, newPassword },
    });
  };