import { User, UserInfo } from "@server/database/database";
import { UserResponse } from "@server/dto/user";

export interface UserForPage {
  firstname: string;
  lastname: string;
  email: string;
  profilePicture?: string;
}
export const mapUserToUserForPage = (user: UserResponse): UserForPage => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    profilePicture: user.profileImage,
  };
};

export const mergeUserAndUserInfo = (
  user: User,
  userInfo: UserInfo
): UserResponse => {
  return {
    userId: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: userInfo?.role,
    profileImage: userInfo?.profile_image,
    about: userInfo?.about,
  };
};
