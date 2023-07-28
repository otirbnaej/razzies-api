import { Router } from 'express';

import moviesRoutes from '@modules/movies/infra/http/routes/movies.routes';

const routes = Router();

routes.use('/movies', moviesRoutes);

export default routes;
