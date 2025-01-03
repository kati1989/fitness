import { useState, useCallback } from "react";
import client from "./api-client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  data?: {
    success: boolean;
  };
  errors: string[];
}

interface LoginResponse {
  data?:
    | {
        success: boolean;
        token?: string | undefined;
      }
    | undefined;
  errors: string[];
}

export const useRegister = () => {
  const [data, setData] = useState<RegisterResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async ({ firstname, lastname, email, password }: RegisterRequest) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.auth.register.$post({
          json: {
            firstname,
            lastname,
            email,
            password,
          },
        });

        const response: RegisterResponse = await result.json();
        setData(response);
        if (response.errors.length > 0) {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, isError, isLoading, sendRequest };
};

export const useLogin = () => {
  const [data, setData] = useState<LoginResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const sendRequest = useCallback(
    async ({ email, password }: LoginRequest) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.auth.login.$post({
          json: { email, password },
        });

        const response: LoginResponse = await result.json();
        setData(response);

        if (response.data?.token) {
          login(response.data?.token);
          navigate("/gyms");
        }

        if (response.errors.length > 0) {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [login, navigate]
  );

  return { data, isError, isLoading, sendRequest };
};
