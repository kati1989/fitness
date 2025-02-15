import { Context } from "hono";
import { CommonResponse } from "../dto/commonResponse";
import { UserRepository } from "../repository/user";
import { generateJWT } from "../utils/jwt";
import { Login, Register } from "../dto/auth";
import { Constants } from "@server/utils/constants";

const userRepository = new UserRepository();

export const changePasswordHandler = async (c: Context) => {
  const formData = await c.req.parseBody();
  const { email, newPassword } = formData;

  if (!email || !newPassword) {
    return c.redirect(
      `/page/change-password?errors=${encodeURIComponent(
        JSON.stringify(["Invalid input"])
      )}`,
      303
    );
  }

  try {
    const user = await userRepository.findByEmail(email as string);

    await userRepository.update(user[0].id, {
      password: newPassword as string,
    });
    return c.redirect(`/page/change-password?success=true`, 303);
  } catch (error) {
    console.error("Error changing password:", error);
    return c.redirect(
      `/page/change-password?errors=${encodeURIComponent(
        JSON.stringify(["Invalid credentials"])
      )}`,
      303
    );
  }
};

export const changeSettingsHandler = async (c: Context) => {
  const formData = await c.req.parseBody();
  const { email, firstname, lastname, newPassword, authToken, backHref } =
    formData;
  const url = `/page/settings?${Constants.queryParams.page.settings.BACK_HREF}=${backHref}&${Constants.queryParams.page.settings.AUTH_TOKEN}=${authToken}`;

  if (!authToken) {
    return c.redirect(`${Constants.env.HOME_UI}/log-in`, 303);
  }

  if (!firstname && !lastname && !newPassword) {
    return c.redirect(
      `${url}&errors=${encodeURIComponent(
        JSON.stringify(["Update data in order to change fields"])
      )}`,
      303
    );
  }

  try {
    const user = await userRepository.findByEmail(email as string);

    if (
      firstname === user[0].firstname &&
      lastname === user[0].lastname &&
      (newPassword === user[0].password || !newPassword)
    ) {
      return c.redirect(
        `${url}&errors=${encodeURIComponent(
          JSON.stringify(["Update data in order to change fields"])
        )}`,
        303
      );
    }

    const updateData: any = {
      firstname: firstname as string,
      lastname: lastname as string,
    };

    if (newPassword) {
      updateData.password = newPassword as string;
    }

    await userRepository.update(user[0].id, updateData);
    return c.redirect(`${url}&success=true`, 303);
  } catch (error) {
    console.error("Error changing settings:", error);
    return c.redirect(
      `/page/settings?errors=${encodeURIComponent(
        JSON.stringify(["Invalid credentials"])
      )}&${Constants.queryParams.page.settings.AUTH_TOKEN}=${authToken}`,
      303
    );
  }
};

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
    console.log(error);
    return c.json(response, 500);
  }
};

export const logoutHandler = async (c: Context) => {
  return c.json({ data: { success: true } }, 200);
};

export const getAuthenticatedUser = async (c: Context) => {
  return await userRepository.findByEmail(c.get("user").email);
};
