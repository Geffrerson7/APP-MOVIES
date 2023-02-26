import { Router } from "express";
import * as Controller from "./controller";
import { requireToken } from "../middlewares/requireToken";

const copymovieRouter = Router();

copymovieRouter.post("/", requireToken, Controller.store)
copymovieRouter.get("/", requireToken, Controller.findAll)
copymovieRouter.get("/movie/:idMovie", requireToken, Controller.findAllForMovie)
copymovieRouter.get("/:id", requireToken, Controller.findOne)
copymovieRouter.put("/:id", requireToken, Controller.update)

export default copymovieRouter;