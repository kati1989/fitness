import { useEffect, useState } from "react";
import { CreateResponse } from "./useGym";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useAuth } from "@/contexts/AuthContext";
import { useApiClient } from "./api-client";

interface UserMembershipResponse {
  type: string;
  expiration: string;
  gym: {
    id: string;
    name: string;
  };
}

interface User {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  role?: string;
  profileImage?: string;
  about?: string;
  memberships: UserMembershipResponse[];
  memberSince: string;
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
  const { isAuthenticated } = useAuth();
  const client = useApiClient();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return;
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

    fetchUser();
  }, [isAuthenticated]);

  return { data, isError, isLoading };
};

export const useUserShortInfo = () => {
  const [data, setData] = useState<UserImageAndName | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const client = useApiClient();

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
export const useAddMembership = () => {
  const [data, setData] = useState<CreateResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const client = useApiClient();

  const addMembership = async (membershipId: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await client.user["add-membership"].$put({
        json: { membershipId },
      });

      const response: CreateResponse = (await result.json()) as CreateResponse;
      setData(response);

      if (response.data?.success) {
        openSnackbar(
          "Congratulations! You have succesfully purchased a new membership!",
          "success"
        );
        navigate("/");
      }

      if (response.errors?.length) {
        openSnackbar("An error occurred.", "error");
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, addMembership, isError, isLoading };
};
