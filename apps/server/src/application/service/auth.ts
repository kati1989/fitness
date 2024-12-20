import { Context } from "hono";
import { CommonResponse } from "../dto/commonResponse";
import { UserRepository } from "../repository/user";
import { generateJWT } from "../utils/jwt";
import { Login, Register } from "../dto/auth";

const userRepository = new UserRepository();

export const loginHandler = async (c: Context) => {
  const { email, password } = await c.req.json();

  const response: CommonResponse<Login> = {
    data: { success: false },
    errors: [],
  };

  if (!email || !password) {
    response.errors.push("Email and password are required.");
    return c.json(response, 400);
  }

  try {
    const user = await userRepository.findByEmail(email);

    if (user.length && user[0].password === password) {
      const token = await generateJWT({ id: user[0].id, email: user[0].email });
      response.data = { success: true, token };
      return c.json(response, 200);
    }

    response.errors.push("Invalid email or password.");
    return c.json(response, 401);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};

export const registerHandler = async (c: Context) => {
  const { firstname, lastname, email, password } = await c.req.json();

  const response: CommonResponse<Register> = {
    data: { success: false },
    errors: [],
  };

  if (!firstname || !lastname || !email || !password) {
    response.errors.push("All fields are required.");
    return c.json(response, 400);
  }

  const newUser = { firstname, lastname, email, password };

  try {
    const createdUser = await userRepository.create(newUser);

    if (createdUser) {
      response.data = { success: true };
      return c.json(response, 201);
    }

    response.errors.push("Failed to create user.");
    return c.json(response, 500);
  } catch (error) {
    response.errors.push((error as Error).message);
    return c.json(response, 500);
  }
};
