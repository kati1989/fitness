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

const userRepository = new UserRepository();
const userInfoRepository = new UserInfoRepository();

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
  const { role, profileImage, about } = await c.req.json();

  const response: CommonResponse<CreateUserResponse> = {
    data: undefined,
    errors: [],
  };
  let user;
  try {
    const authenticatedUser = c.get("user");
    const users = await userRepository.findByEmail(authenticatedUser.email);
    user = users[0];
  } catch (error) {
    console.log(error);
    response.errors.push((error as Error).message);
    return c.json(response, 404);
  }

  if (!user) {
    response.errors.push("User not found.");
    return c.json(response, 404);
  }

  let userInfo;

  try {
    const usersInfo = await userInfoRepository.findByUserId(user.id);
    userInfo = usersInfo[0];
  } catch (error) {
    console.log(error);
    response.errors.push((error as Error).message);
  }

  if (!userInfo) {
    try {
      const id = uuid();
      const role: UserRole = "Fitness Enthusiast";
      await userInfoRepository.create({
        id,
        user_id: user.id,
        role,
        about: about,
        profile_image: profileImage,
      });
      response.data = { success: true };
      return c.json(response, 200);
    } catch (error) {
      response.errors.push((error as Error).message);
      return c.json(response, 500);
    }
  }

  try {
    await userInfoRepository.update(userInfo.id, {
      role: role,
      about: about,
      profile_image: profileImage,
    });
    response.data = { success: true };
    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

const getMergedUsers = (users: User[], usersInfo: UserInfo[]) => {
  return users.map((user) => {
    const userInfo = usersInfo.find((info) => info.user_id === user.id);
    return mergeUserAndUserInfo(user, userInfo);
  });
};

const fetchUser = async (c: Context): Promise<UserResponse> => {
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

  try {
    return mergeUserAndUserInfo(user, userInfo);
  } catch (error) {
    throw new Error(`Error merging user data: ${(error as Error).message}`);
  }
};
