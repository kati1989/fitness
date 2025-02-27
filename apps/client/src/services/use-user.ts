import { useEffect, useState } from "react";
import client from "./api-client";

interface User {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  role?: string;
  profileImage?: string;
  about?: string;
}

interface UserResponse {
  data?: User;
  errors: string[];
}

export interface UserImageAndName {
  fullName: string;
  profileImage?: string;
}

interface UserImageAndNameResponse {
  data?: UserImageAndName;
  errors: string[];
}

export const useUser = () => {
  const [data, setData] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGym = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.user["get-info"].$get();

        const response: UserResponse = (await result.json()) as UserResponse;

        if (response.data) {
          setData(response.data);
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGym();
  }, []);

  return { data, isError, isLoading };
};

export const useUserShortInfo = () => {
  const [data, setData] = useState<UserImageAndName | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGym = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.user["get-short-info"].$get();

        const response: UserImageAndNameResponse =
          (await result.json()) as UserImageAndNameResponse;

        if (response.data) {
          setData(response.data);
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGym();
  }, []);

  return { data, isError, isLoading };
};
