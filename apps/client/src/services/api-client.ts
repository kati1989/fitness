// api-client.ts
import { ApiClient } from "server/src";
import { useAuth } from "@/contexts/AuthContext";

export const useApiClient = () => {
  const { authToken } = useAuth();
  const client = ApiClient("http://localhost:3000/", authToken);
  return client;
};
