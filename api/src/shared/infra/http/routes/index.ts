import { Router } from 'express';

import csvRoutes from '@shared/infra/http/routes/csv.routes';
import producersRoutes from '@src/modules/producers/infra/http/routes/producers.routes';

const routes = Router();

routes.use('/csv', csvRoutes);
routes.use('/producers', producersRoutes);

export default routes;
