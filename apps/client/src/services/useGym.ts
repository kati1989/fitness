import { useCallback, useEffect, useState } from "react";
import { UserImageAndName } from "./use-user";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useApiClient } from "./api-client";

export interface Comment {
  user: UserImageAndName;
  score: number;
  comment: string;
}

interface Gym {
  id: string;
  hasUserMemberships?: boolean;
  name: string;
  location: string;
  primary_phone_contact: string;
  image?: string;
  primary_email_contact: string;
  description?: string;
  created_at: string;
  updated_at: string;
  score?: number | null;
  memberships?: Membership[];
  comments?: Comment[];
}

export interface Membership {
  id: string;
  type: string;
  monthly_price: number;
  yearly_price: string;
  description: string;
  short_description: string;
}

interface GymsResponse {
  data?: {
    gyms: Gym[];
  };
  errors: string[];
}

interface GymResponse {
  data?: {
    gym: Gym;
  };
  errors: string[];
}

export interface CreateResponse {
  data?: {
    success: boolean;
  };
  errors?: string[];
}

interface LetReviewRequest {
  gymId: string;
  comment: string;
  rating: number;
}

interface MembershipWithGym {
  membership: Membership;
  gym: Gym;
}
interface MembershipWithGymResponse {
  data?: MembershipWithGym;
  errors?: string[];
}

export const useGyms = () => {
  const [data, setData] = useState<Gym[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const client = useApiClient();

  useEffect(() => {
    const fetchGyms = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.gym.$get();
        const response: GymsResponse = await result.json();

        if (response.data) {
          setData(response.data.gyms);
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return { data, isError, isLoading };
};

export const useGym = (id: string) => {
  const [data, setData] = useState<Gym | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const client = useApiClient();

  useEffect(() => {
    const fetchGym = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.gym[":id"].$get({ param: { id: id } });

        const response: GymResponse = await result.json();

        if (response.data) {
          setData(response.data.gym);
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
  }, [id]);

  return { data, isError, isLoading };
};

export const useLetReview = () => {
  const [data, setData] = useState<CreateResponse | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const client = useApiClient();

  const sendRequest = useCallback(
    async ({ gymId, comment, rating }: LetReviewRequest) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.gym.review.$post({
          json: {
            gym_id: gymId,
            comment,
            score: rating,
          },
        });

        const response: CreateResponse = await result.json();
        setData(response);

        if (response.data?.success) {
          openSnackbar("Review added successfully!", "success");
          navigate("/");
        }

        if (response.errors?.length) {
          openSnackbar("An error occurred.", "error");
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, openSnackbar]
  );

  return { data, isError, isLoading, sendRequest };
};

export const useMembership = (id: string) => {
  const [data, setData] = useState<MembershipWithGym | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const client = useApiClient();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await client.gym.membership[":id"].$get({
          param: { id: id },
        });

        const response: MembershipWithGymResponse = await result.json();

        if (response.data) {
          setData(response.data);
        } else {
          setIsError(true);
        }

        if (response.errors && response.errors?.length > 0) {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { data, isError, isLoading };
};
