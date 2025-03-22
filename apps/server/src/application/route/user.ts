import { Hono } from "hono";
import {
  addMembership,
  getAllUsers,
  getShortInfo,
  getUser,
  updateUser,
} from "@server/service/user";
import { authenticateJWT } from "@server/middleware/authMiddleware";

const userRoutes = new Hono()
  .use("*", authenticateJWT)
  .get("/", getAllUsers)
  .get("/get-short-info", getShortInfo)
  .get("/get-info", getUser)
  .put("/", updateUser)
  .put("/add-membership", addMembership);

export default userRoutes;
