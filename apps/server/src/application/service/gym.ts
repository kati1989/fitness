import { Context } from "hono";
import { CommonResponse } from "../dto/commonResponse";
import { GymRepository } from "../repository/gym";
import { CreateGymResponse, GetGymResponse, GetGymsResponse } from "../dto/gym";
import { v4 as uuid } from "uuid";

const gymRepository = new GymRepository();

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

    response.data = {
      gyms: gyms.map((gym) => ({
        id: gym.id,
        name: gym.name,
        location: gym.location,
        image: gym.image ?? undefined,
        primary_phone_contact: gym.primary_phone_contact,
        primary_email_contact: gym.primary_email_contact,
        description: gym.description ?? undefined,
        created_at: gym.created_at.toISOString(),
        updated_at: gym.updated_at ? gym.updated_at.toISOString() : "",
      })),
    };

    return c.json(response, 200);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const getGymHandler = async (c: Context) => {
  const id = c.req.param("id");
  const response: CommonResponse<GetGymResponse> = {
    data: undefined,
    errors: [],
  };

  if (!id) {
    response.errors.push("Invalid ID.");
    return c.json(response, 400);
  }

  try {
    const gym = await gymRepository.findById(id);

    if (gym.length === 0) {
      response.errors.push("Gym not found.");
      return c.json(response, 404);
    }

    response.data = {
      gym: {
        id: gym[0].id,
        name: gym[0].name,
        location: gym[0].location,
        image: gym[0].image ?? undefined,
        primary_phone_contact: gym[0].primary_phone_contact,
        primary_email_contact: gym[0].primary_email_contact,
        description: gym[0].description ?? undefined,
        created_at: gym[0].created_at.toISOString(),
        updated_at: gym[0].updated_at ? gym[0].updated_at.toISOString() : "",
      },
    };

    return c.json(response, 200);
  } catch (error) {
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
