import { Context } from "hono";
import { CommonResponse } from "../dto/commonResponse";
import { GymRepository } from "../repository/gym";
import {
  CreateGymResponse,
  GetComments,
  GetGymResponseWithMembershipAndComments,
  GetGymsResponse,
  GetMembershipWithGymResponse,
} from "../dto/gym";
import { v4 as uuid } from "uuid";
import { GymMembershipRepository } from "../repository/gym-membership";
import { calculateGymScore } from "@server/utils/gym";
import { GymScoreRepository } from "@server/repository/gym-score";
import { UserRepository } from "@server/repository/user";
import { UserInfoRepository } from "@server/repository/userInfo";
import {
  Gym,
  GymMembership,
  GymScore,
  NewGymScore,
  UserInfo,
} from "@server/database/database";
import { UserMembershipRepository } from "@server/repository/user-membership";

const gymRepository = new GymRepository();
const gymMembershipRepository = new GymMembershipRepository();
const userMembershipRepository = new UserMembershipRepository();
const gymScoreRepository = new GymScoreRepository();
const userRepository = new UserRepository();
const userInfoRepository = new UserInfoRepository();

export const createGymMembershipReviewHandler = async (c: Context) => {
  const { gym_id, score, comment } = await c.req.json();
  const authenticatedUser = await c.get("user");
  const id = uuid();

  const newGymScore: NewGymScore = {
    id,
    gym_id,
    user_id: authenticatedUser.id,
    score,
    comment,
  };

  const response: CommonResponse<CreateGymResponse> = {
    data: undefined,
    errors: [],
  };

  try {
    await gymScoreRepository.create(newGymScore);
    response.data = { success: true };
    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const createGymHandler = async (c: Context) => {
  const {
    name,
    location,
    image,
    primary_phone_contact,
    primary_email_contact,
    description,
  } = await c.req.json();
  const response: CommonResponse<CreateGymResponse> = {
    data: undefined,
    errors: [],
  };

  if (!name || !location || !primary_phone_contact || !primary_email_contact) {
    response.errors.push("Name, location, and contact are required.");
    return c.json(response, 400);
  }

  const id = uuid();

  try {
    const newGym = {
      id,
      name,
      location,
      primary_phone_contact,
      primary_email_contact,
      image,
      description,
    };
    await gymRepository.create(newGym);
    response.data = { success: true };
    return c.json(response, 201);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};
export const getAllGymsHandler = async (c: Context) => {
  const response: CommonResponse<GetGymsResponse> = {
    data: undefined,
    errors: [],
  };

  try {
    const gyms = await gymRepository.findAll();

    const gymScoresPromises = gyms.map(async (gym: Gym) => {
      const gymScore = await gymScoreRepository.findByGymId(gym.id);
      return {
        gymId: gym.id,
        score: calculateGymScore(gymScore) ?? 0,
      };
    });

    const gymScores = await Promise.all(gymScoresPromises);

    response.data = {
      gyms: gyms.map((gym: Gym) => {
        const gymScore =
          gymScores.find((score) => score.gymId === gym.id)?.score ?? 0;

        return {
          id: gym.id,
          score: gymScore,
          name: gym.name,
          location: gym.location,
          image: gym.image ?? undefined,
          primary_phone_contact: gym.primary_phone_contact,
          primary_email_contact: gym.primary_email_contact,
          description: gym.description ?? undefined,
          created_at: gym.created_at.toISOString(),
          updated_at: gym.updated_at ? gym.updated_at.toISOString() : "",
        };
      }),
    };

    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const getGymHandler = async (c: Context) => {
  const id = c.req.param("id");
  const authenticatedUser = await c.get("user");

  const response: CommonResponse<GetGymResponseWithMembershipAndComments> = {
    data: undefined,
    errors: [],
  };

  if (!id) {
    response.errors.push("Invalid ID.");
    return c.json(response, 400);
  }

  let userMemberships;
  try {
    userMemberships = await userMembershipRepository.findByUserIdAndGymId(
      authenticatedUser.id,
      id
    );
  } catch (error) {
    console.log(error);
    throw new Error(
      `Error retrieving user ${authenticatedUser} memberships for gym ${id}: ${
        (error as Error).message
      }`
    );
  }

  try {
    const gyms = await gymRepository.findById(id);

    if (gyms.length === 0) {
      response.errors.push("Gym not found.");
      return c.json(response, 404);
    }
    const gym = gyms[0];
    const gymMemberships = await gymMembershipRepository.findByGymId(gym.id);

    const gymScores = await gymScoreRepository.findByGymId(gym.id);

    response.data = {
      gym: {
        hasUserMemberships: userMemberships.length > 0,
        id: gym.id,
        name: gym.name,
        location: gym.location,
        image: gym.image ?? undefined,
        primary_phone_contact: gym.primary_phone_contact,
        primary_email_contact: gym.primary_email_contact,
        description: gym.description ?? undefined,
        created_at: gym.created_at.toISOString(),
        updated_at: gym.updated_at ? gym.updated_at.toISOString() : "",
        score: calculateGymScore(gymScores)!,
        comments: await mapComments(gymScores),
        memberships: mapMemberships(gymMemberships),
      },
    };

    return c.json(response, 200);
  } catch (error) {
    console.log(error);
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const updateGymHandler = async (c: Context) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const response: CommonResponse<CreateGymResponse> = {
    data: undefined,
    errors: [],
  };

  if (!id) {
    response.errors.push("Invalid ID.");
    return c.json(response, 400);
  }

  try {
    await gymRepository.update(id, updates);
    response.data = { success: true };
    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const deleteGymHandler = async (c: Context) => {
  const id = c.req.param("id");
  const response: CommonResponse<CreateGymResponse> = {
    data: undefined,
    errors: [],
  };

  if (!id) {
    response.errors.push("Invalid ID.");
    return c.json(response, 400);
  }

  try {
    await gymRepository.delete(id);
    response.data = { success: true };
    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

const mapMemberships = (memberships: GymMembership[]) => {
  return memberships.map((membership) => ({
    id: membership.id,
    type: membership.type,
    monthly_price: membership.monthly_price,
    yearly_price: membership.yearly_price,
    description: membership.description,
    short_description: membership.short_description,
  }));
};

const mapComments = async (comments: GymScore[]) => {
  const commentPromises = comments.map((comment) => getScoreWithUser(comment));
  return Promise.all(commentPromises);
};

const getScoreWithUser = async (score: GymScore) => {
  const users = await userRepository.find(score.user_id);

  if (users.length === 0) {
    throw new Error(`User not found by id: ${score.user_id}`);
  }
  const user = users[0];

  const usersInfo = await userInfoRepository.findByUserId(user.id);
  let userInfo: UserInfo | undefined;

  if (usersInfo.length !== 0) {
    userInfo = usersInfo[0];
  }
  console.log("User=>", user, usersInfo, user.id);

  const comment: GetComments = {
    comment: score.comment,
    score: score.score,
    user: {
      fullName: `${user.firstname} ${user.lastname}`,
      profileImage: userInfo?.profile_image,
    },
  };

  return comment;
};

export const getMembershipHandler = async (c: Context) => {
  const id = c.req.param("id");
  const response: CommonResponse<GetMembershipWithGymResponse> = {
    data: undefined,
    errors: [],
  };

  if (!id) {
    response.errors.push("Invalid ID.");
    return c.json(response, 400);
  }

  let gymMembership;

  try {
    const gymMemberships = await gymMembershipRepository.findById(id);

    if (gymMemberships.length === 0) {
      response.errors.push("Gym membership not found.");
      return c.json(response, 404);
    }
    gymMembership = gymMemberships[0];
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }

  console.log("Gym membership", gymMembership);

  let gym;

  try {
    const gyms = await gymRepository.findById(gymMembership.gym_id);

    if (gyms.length === 0) {
      response.errors.push("Gym not found.");
      return c.json(response, 404);
    }
    gym = gyms[0];
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }

  response.data = {
    membership: {
      id: gymMembership.id,
      type: gymMembership.type,
      monthly_price: gymMembership.monthly_price,
      yearly_price: gymMembership.yearly_price,
      description: gymMembership.description,
      short_description: gymMembership.short_description,
    },
    gym: {
      id: gym.id,
      name: gym.name,
      location: gym.location,
      primary_phone_contact: gym.primary_phone_contact,
      primary_email_contact: gym.primary_email_contact,
      image: gym.image ?? undefined,
      description: gym.description ?? undefined,
      created_at: gym.created_at,
      updated_at: gym.updated_at ? gym.updated_at.toISOString() : "",
    },
  };

  return c.json(response, 200);
};
