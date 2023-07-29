import FindWinningGapService from '@src/modules/producers/services/FindWinningGapService';
import { Request, Response } from 'express';

class FindWinningGapController {
  public async show(request: Request, response: Response) {
    const personService = new FindWinningGapService();

    const interactions = await personService.execute();

    return response.json(interactions);
  }
}

export default new FindWinningGapController();
