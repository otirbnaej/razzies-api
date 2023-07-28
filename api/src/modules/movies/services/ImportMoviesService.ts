import fs from 'fs';
import csvParser from 'csv-parser';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

interface Movie {
  id: string;
  year: number;
  title: string;
  winner: boolean;
  studios?: string;
  producers?: string;
}

export default class ImportMoviesService {
  public async execute(filepath: any) {
    const adapter = new FileSync('db.json');

    // Inicialize o banco de dados
    const db = low(adapter);

    if (!db.has('movies').value()) {
      db.defaults({ movies: [] }).write();
    }

    if (!db.has('studios').value()) {
      db.defaults({ studios: [] }).write();
    }

    if (!db.has('producers').value()) {
      db.defaults({ producers: [] }).write();
    }

    fs.createReadStream(filepath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row: any) => {
        const movieData: Movie = {
          id: Date.now().toString(),
          year: row.year,
          title: row.title,
          winner: row.winner === 'yes',
        };
        const studios: string[] = row.studios ? row.studios.split(', ') : [];
        const producers: string[] = row.producers
          ? row.producers.split(', ')
          : [];

        db.get('movies')
          .push({
            id: Date.now().toString(),
            year: row.year,
            title: row.title,
            winner: row.winner === 'yes',
          })
          .write();

        studios.forEach(studio => {
          db.get('studios')
            .push({ movieId: movieData.id, name: studio })
            .write();
        });

        producers.forEach(producer => {
          db.get('producers')
            .push({ movieId: movieData.id, name: producer })
            .write();
        });
      })
      .on('end', () => {
        console.log('CSV processing completed.');
      });
  }
}
