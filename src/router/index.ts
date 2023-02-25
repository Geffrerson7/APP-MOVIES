import type { Application, Router } from "express";
import * as ROUTES from "../components";

const routes: [string, Router][] = [
  ["user", ROUTES.UserRouter],
];

const router = (app: Application): void => {
  routes.forEach(([path, controler]) => {
    app.use(`/api/v1/${path}`, controler);
  });
};

export default router;