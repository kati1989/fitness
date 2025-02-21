export interface CreateUserResponse {
  success: boolean;
}

export interface UserResponse {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  role?: string;
  profileImage?: string;
  about?: string;
}

export interface UserImageAndNameResponse {
  fullName: string;
  profileImage?: string;
}
