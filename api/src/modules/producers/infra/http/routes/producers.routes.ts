import { Router } from 'express';
import FindWinningGapController from '../controllers/FindWinningGapController';

const routes = Router();

routes.get('/gap', FindWinningGapController.show);

export default routes;
