import { useEffect, useState } from "react";
import client from "./api-client";
import { UserImageAndName } from "./use-user";

export interface Comment {
  user: UserImageAndName;
  score: number;
  comment: string;
}

interface Gym {
  id: string;
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

export const useGyms = () => {
  const [data, setData] = useState<Gym[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
