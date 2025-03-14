import { Hono } from "hono";
import {
  createGymHandler,
  getAllGymsHandler,
  getGymHandler,
  updateGymHandler,
  deleteGymHandler,
  createGymMembershipReviewHandler,
} from "../service/gym";
import { authenticateJWT } from "@server/middleware/authMiddleware";

const gymRoutes = new Hono()
  .use("*", authenticateJWT)
  .post("/", createGymHandler)
  .post("/review", createGymMembershipReviewHandler)
  .get("/", getAllGymsHandler)
  .get("/:id", getGymHandler)
  .put("/:id", updateGymHandler)
  .delete("/:id", deleteGymHandler);

export default gymRoutes;
