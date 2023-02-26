import { Router } from "express";
import * as Controller from "./controller";
import { requireToken } from "../middlewares/requireToken";

const loanRouter = Router();

loanRouter.get("/:id", requireToken, Controller.findOne)
loanRouter.get("/", requireToken, Controller.findAll)
loanRouter.post("/", requireToken, Controller.store)
loanRouter.put("/:id", requireToken, Controller.update)

export default loanRouter;