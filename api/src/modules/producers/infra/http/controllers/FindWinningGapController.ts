import FindWinningGapService from '@src/modules/producers/services/FindWinningGapService';
import { Request, Response } from 'express';

class FindWinningGapController {
  public async show(request: Request, response: Response) {
    const findWinningGap = new FindWinningGapService();

    const data = await findWinningGap.execute();

    return response.json(data);
  }
}

export default new FindWinningGapController();
