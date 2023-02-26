import { Router } from "express";
import * as Controller from "./controller";

const copymovieRouter = Router();

copymovieRouter.post("/", Controller.store)
copymovieRouter.get("/", Controller.findAll)
copymovieRouter.get("/movie/:idMovie", Controller.findAllForMovie)
copymovieRouter.get("/:id", Controller.findOne)
copymovieRouter.put("/:id", Controller.update)

export default copymovieRouter;