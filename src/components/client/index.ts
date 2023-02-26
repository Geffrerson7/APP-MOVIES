import { Router } from "express";
import * as Controller from "./controller";

const clientRouter = Router();

clientRouter.post("/", Controller.store)
clientRouter.get("/:id", Controller.findOne)
clientRouter.get("/", Controller.findAll)
clientRouter.put("/:id", Controller.update)

export default clientRouter;