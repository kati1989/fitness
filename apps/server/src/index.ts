import { hc } from "hono/client";
import type { AppType } from "./application/application";

export { AppType };
export const ApiClient = (url: string, token: string | null) =>
  hc<AppType>(url, {
    fetch: async (input: RequestInfo | URL, requestInit?: RequestInit) => {
      const makeRequest = async (authToken: string | null) => {
        const headers = {
          ...requestInit?.headers,
          Authorization: `Bearer ${authToken}`,
        };

        const response = await fetch(input, {
          ...requestInit,
          headers,
        });

        if (response.status === 401) {
          const responseBody = await response.json();
          const newToken = responseBody?.token;

          if (newToken) {
            console.log("New Token:", newToken);
            localStorage.setItem("authToken", newToken);
            return makeRequest(newToken); // Retry with the new token
          }
        }

        return response; // Return the original response if not 401 or no new token
      };

      return makeRequest(token);
    },
  });
