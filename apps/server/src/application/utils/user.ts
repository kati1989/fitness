import {
  GymMembership,
  UesrMembership,
  User,
  UserInfo,
} from "@server/database/database";
import { UserMembershipResponse, UserResponse } from "@server/dto/user";
import { UserMembershipWithDetails } from "@server/repository/user-membership";

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
  userInfo: UserInfo,
  memberships?: UserMembershipWithDetails[]
): UserResponse => {
  return {
    userId: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: userInfo?.role,
    profileImage: userInfo?.profile_image,
    about: userInfo?.about,
    memberships: mapMemberships(memberships!),
    memberSince: user.created_at ?? userInfo.created_at,
  };
};

export const mapMemberships = (
  memberships: UserMembershipWithDetails[]
): UserMembershipResponse[] => {
  return memberships.map((membership) => ({
    type: membership.type,
    expiration: new Date(
      new Date(membership.createdAt).setMonth(
        new Date(membership.createdAt).getMonth() + 1
      )
    ).toISOString(),
    gym: {
      id: membership.gymId,
      name: membership.gymName,
    },
  }));
};
