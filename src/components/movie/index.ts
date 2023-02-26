import { Router } from "express";
import * as Controller from "./controller";

const movieRouter = Router();


movieRouter.get("/:id",Controller.findOne)
movieRouter.get("/", Controller.findAll)
movieRouter.post("/", Controller.store)
movieRouter.put("/:id", Controller.update)

export default movieRouter;