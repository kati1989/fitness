import { useEffect, useState } from "react";
import client from "./api-client";

interface Gym {
  id: number;
  name: string;
  location: string;
  primary_phone_contact: string;
  image?: string;
  primary_email_contact: string;
  description?: string;
  created_at: string;
  updated_at: string;
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
        // Correctly using dynamic gym ID in the API request
        const result = await client.gym[":id"].$get({ param: { id: id } });

        const response: GymResponse = await result.json();

        if (response.data) {
          // Assuming only one gym is returned for a specific ID
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
  }, [id]); // Fetch again if the ID changes

  return { data, isError, isLoading };
};
