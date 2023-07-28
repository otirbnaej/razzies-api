import ImportMoviesService from '@src/modules/movies/services/ImportMoviesService';
import { Request, Response } from 'express';

class ImportMoviesController {
  public async create(request: Request, response: Response) {
    const importMoviesService = new ImportMoviesService();

    const filePath = request.file?.path;
    if (filePath) {
      importMoviesService.execute(filePath);
      response.json({ message: 'CSV uploaded and processed successfully.' });
    } else {
      response.status(400).json({ message: 'No CSV file provided.' });
    }

    // const msg = importMoviesService
    //   .execute(request.file.path)
    //   .then(() =>
    //     response.send('Arquivo CSV recebido e processado com sucesso!'),
    //   )
    //   .catch((err: { message: string }) =>
    //     response
    //       .status(500)
    //       .send('Erro ao processar o arquivo CSV: ' + err.message),
    //   );

    // return msg;
    // const { body } = request;

    // const importMoviesService = new ImportMoviesService();

    // const movies = await importMoviesService.execute(body);

    // return response.json(movies);
  }
}

export default new ImportMoviesController();
