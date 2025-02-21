import { User, UserInfo } from "@server/database/database";
import { UserResponse } from "@server/dto/user";

export interface UserForPage {
  firstname: string;
  lastname: string;
  email: string;
}
export const mapUserToUserForPage = (user: User): UserForPage => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
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
