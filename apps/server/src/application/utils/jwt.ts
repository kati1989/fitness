import { sign } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateJWT = async (
  payload: object,
  exp: number = 3600
): Promise<string> => {
  const tokenPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + exp,
  };

  return await sign(tokenPayload, JWT_SECRET!);
};
