import fs from 'fs';
import csvParser from 'csv-parser';
import db from '@src/shared/infra/lowdb/db';
import { v4 as uuidv4 } from 'uuid';

import { IMovieDTO } from '@src/modules/movies/dtos/IMovieDTO';
import { ClearDB } from '@src/utils/clearDB';

const allStudios: string[] = [];
const allProducers: string[] = [];

export default class ImportCSVService {
  public async execute(filepath: string) {
    ClearDB();
    fs.createReadStream(filepath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', row => {
        const movieData: IMovieDTO = {
          id: Date.now().toString(),
          year: row.year,
          title: row.title,
          winner: row.winner === 'yes',
        };
        const studios: string[] = row.studios ? row.studios.split(', ') : [];
        const producers: string[] = row.producers
          ? row.producers.trim().split(/,\s*| and\s+/)
          : [];

        db.get('movies')
          .push({
            ...movieData,
            studios,
            producers,
          })
          .write();

        studios.forEach(studio => {
          const studioExists = allStudios.includes(studio);
          if (!studioExists) {
            db.get('studios').push({ id: uuidv4(), name: studio }).write();
            allStudios.push(studio);
          }
        });

        producers.forEach(producer => {
          const producerExists = allProducers.includes(producer);
          if (!producerExists) {
            db.get('producers').push({ id: uuidv4(), name: producer }).write();
            allProducers.push(producer);
          }
        });
      });
  }
}
