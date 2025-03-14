import { Context } from "hono";
import { CommonResponse } from "../dto/commonResponse";
import { UserRepository } from "../repository/user";
import { UserInfoRepository } from "@server/repository/userInfo";
import {
  CreateUserResponse,
  UserImageAndNameResponse,
  UserResponse,
} from "@server/dto/user";
import { v4 as uuid } from "uuid";
import { User, UserInfo } from "@server/database/database";
import { mergeUserAndUserInfo } from "@server/utils/user";
import { UserRole } from "@server/schema/role";
import { UserMembershipRepository } from "@server/repository/user-membership";

const userRepository = new UserRepository();
const userInfoRepository = new UserInfoRepository();
const userMembershipRepository = new UserMembershipRepository();

export const getAllUsers = async (c: Context) => {
  const response: CommonResponse<UserResponse[]> = {
    data: undefined,
    errors: [],
  };

  let users;
  try {
    users = await userRepository.findAll();
  } catch (error) {
    console.log(error);
    users = [];
    response.errors.push((error as Error).message);
  }

  let usersInfo;
  try {
    usersInfo = await userInfoRepository.findAll();
  } catch (error) {
    console.log(error);
    usersInfo = [];
    response.errors.push((error as Error).message);
  }

  try {
    response.data = getMergedUsers(users, usersInfo);
    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const getUser = async (c: Context) => {
  const response: CommonResponse<UserResponse> = {
    data: undefined,
    errors: [],
  };

  try {
    response.data = await fetchUser(c);
    return c.json(response, 200);
  } catch (error) {
    console.log(error);
    response.errors.push((error as Error).message);
    return c.json(response, 400);
  }
};

export const getShortInfo = async (c: Context) => {
  const response: CommonResponse<UserImageAndNameResponse> = {
    data: undefined,
    errors: [],
  };

  try {
    const user = await fetchUser(c);
    response.data = {
      fullName: `${user.firstname} ${user.lastname}`,
      profileImage: user.profileImage,
    };
    return c.json(response, 200);
  } catch (error) {
    console.log(error);
    response.errors.push((error as Error).message);
    return c.json(response, 400);
  }
};

export const updateUser = async (c: Context) => {
  const response: CommonResponse<CreateUserResponse> = {
    data: undefined,
    errors: [],
  };

  try {
    const { role, profileImage, about } = await c.req.json();
    await performUserUpdate(c, { role, profileImage, about });
    response.data = { success: true };
    return c.json(response, 200);
  } catch (error) {
    console.log(error);
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const performUserUpdate = async (
  c: Context,
  {
    role,
    profileImage,
    about,
  }: { role?: UserRole; profileImage?: string; about?: string }
): Promise<void> => {
  let user;
  try {
    const authenticatedUser = c.get("user");
    const users = await userRepository.findByEmail(authenticatedUser.email);
    user = users[0];
    if (!user) throw new Error("User not found.");
  } catch (error) {
    console.log(error);
    throw new Error(`Error retrieving user: ${(error as Error).message}`);
  }

  let userInfo;
  try {
    const usersInfo = await userInfoRepository.findByUserId(user.id);
    userInfo = usersInfo[0];
  } catch (error) {
    console.log(error);
    throw new Error(`Error retrieving user info: ${(error as Error).message}`);
  }

  if (!userInfo) {
    await createUserInfo(user.id, role!, profileImage!, about!);
  } else {
    await updateUserInfo(userInfo.id, role!, profileImage!, about!);
  }
};

const createUserInfo = async (
  userId: string,
  role: UserRole,
  profileImage: string,
  about: string
) => {
  try {
    const id = uuid();
    await userInfoRepository.create({
      id,
      user_id: userId,
      role,
      about,
      profile_image: profileImage,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error creating user info: ${(error as Error).message}`);
  }
};

const updateUserInfo = async (
  userInfoId: string,
  role: UserRole,
  profileImage: string,
  about: string
) => {
  try {
    await userInfoRepository.update(userInfoId, {
      role,
      about,
      profile_image: profileImage,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error updating user info: ${(error as Error).message}`);
  }
};

const getMergedUsers = (users: User[], usersInfo: UserInfo[]) => {
  return users.map((user) => {
    const userInfo = usersInfo.find((info) => info.user_id === user.id);
    return mergeUserAndUserInfo(user, userInfo);
  });
};

export const fetchUser = async (c: Context): Promise<UserResponse> => {
  let user;
  try {
    const authenticatedUser = c.get("user");
    const users = await userRepository.findByEmail(authenticatedUser.email);
    user = users[0];
  } catch (error) {
    console.log(error);
    throw new Error(
      `Error retrieving user from context: ${(error as Error).message}`
    );
  }

  let userInfo;
  try {
    const usersInfo = await userInfoRepository.findByUserId(user.id);
    userInfo = usersInfo[0];
  } catch (error) {
    console.log(error);
    throw new Error(`Error retrieving user info: ${(error as Error).message}`);
  }

  let memberships;
  try {
    memberships = await userMembershipRepository.findByUserIdWithMemberships(
      user.id
    );
  } catch (error) {
    console.log(error);
    throw new Error(
      `Error retrieving user memberships: ${(error as Error).message}`
    );
  }

  try {
    return mergeUserAndUserInfo(user, userInfo, memberships);
  } catch (error) {
    throw new Error(`Error merging user data: ${(error as Error).message}`);
  }
};
