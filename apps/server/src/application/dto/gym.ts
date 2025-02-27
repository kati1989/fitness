import { UserImageAndNameResponse } from "./user";

export interface CreateGymResponse {
  success: boolean;
}

export interface GetMembership {
  type: string;
  monthly_price: number;
  yearly_price: string;
  description: string;
  short_description: string;
}

export interface GetComments {
  user: UserImageAndNameResponse;
  score: number;
  comment: string;
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

export interface GetGymResponseWithMembershipAndComments {
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
    score?: number;
    comments?: GetComments[];
    memberships?: GetMembership[];
  };
}

export interface GetGymsResponse {
  gyms: GetGymResponse["gym"][];
}
