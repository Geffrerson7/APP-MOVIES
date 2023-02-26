import type { Application, Router } from "express";
import * as ROUTES from "../components";

const routes: [string, Router][] = [
  ["user", ROUTES.UserRouter],
  ["movie", ROUTES.MovieRouter],
  ["copy-movie", ROUTES.CopymovieRouter],
  ["client", ROUTES.ClientRouter],
  ["loan", ROUTES.LoanRouter],
];

const router = (app: Application): void => {
  routes.forEach(([path, controler]) => {
    app.use(`/api/v1/${path}`, controler);
  });
};

export default router;