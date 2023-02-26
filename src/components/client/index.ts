import { Router } from "express";
import * as Controller from "./controller";
import { requireToken } from "../middlewares/requireToken";

const clientRouter = Router();

clientRouter.post("/", requireToken, Controller.store)
clientRouter.get("/:id", requireToken, Controller.findOne)
clientRouter.get("/", requireToken, Controller.findAll)
clientRouter.put("/:id", requireToken, Controller.update)

export default clientRouter;