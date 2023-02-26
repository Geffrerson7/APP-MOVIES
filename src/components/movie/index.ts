import { Router } from "express";
import * as Controller from "./controller";
import { requireToken } from "../middlewares/requireToken";

const movieRouter = Router();


movieRouter.get("/:id", requireToken,Controller.findOne)
movieRouter.get("/", requireToken, Controller.findAll)
movieRouter.post("/", requireToken,Controller.store)
movieRouter.put("/:id", requireToken,Controller.update)

export default movieRouter;