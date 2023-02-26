import { Router } from "express";
import * as Controller from "./controller";

const loanRouter = Router();


loanRouter.get("/:id",Controller.findOne)
loanRouter.get("/", Controller.findAll)
loanRouter.post("/", Controller.store)
loanRouter.put("/:id", Controller.update)

export default loanRouter;