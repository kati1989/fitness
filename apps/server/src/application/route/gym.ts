import { Hono } from "hono";
import {
  createGymHandler,
  getAllGymsHandler,
  getGymHandler,
  updateGymHandler,
  deleteGymHandler,
} from "../service/gym";

const gymRoutes = new Hono()
  .post("/", createGymHandler)
  .get("/", getAllGymsHandler)
  .get("/:id", getGymHandler)
  .put("/:id", updateGymHandler)
  .delete("/:id", deleteGymHandler);

export default gymRoutes;
