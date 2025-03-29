export interface CreateUserResponse {
  success: boolean;
}

export interface UserMembershipResponse {
  type: string;
  expiration: string;
  gym: {
    id: string;
    name: string;
  };
}

export interface UserResponse {
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

export interface UserImageAndNameResponse {
  fullName: string;
  profileImage?: string;
}
