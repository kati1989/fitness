export interface CreateGymResponse {
  success: boolean;
}

export interface GetGymResponse {
  gym: {
    id: string;
    name: string;
    location: string;
    primary_phone_contact: string;
    image?: string;
    primary_email_contact: string;
    description?: string;
    created_at: string;
    updated_at: string;
  };
}

export interface GetGymsResponse {
  gyms: GetGymResponse["gym"][];
}
