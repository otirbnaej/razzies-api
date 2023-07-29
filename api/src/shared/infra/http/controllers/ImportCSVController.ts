import ImportCSVService from '@src/shared/services/ImportCSVService';
import { Request, Response } from 'express';

class ImportCSVController {
  public async create(request: Request, response: Response) {
    const importMoviesService = new ImportCSVService();

    const filePath = request.file?.path;
    if (filePath) {
      importMoviesService.execute(filePath);
      response.json({ message: 'CSV uploaded and processed successfully.' });
    } else {
      response.status(400).json({ message: 'No CSV file provided.' });
    }
  }
}

export default new ImportCSVController();
