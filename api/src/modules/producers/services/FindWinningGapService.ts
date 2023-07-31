import db from '@src/shared/infra/lowdb/db';
import { IProducerDTO } from '../dtos/IProducerDTO';
import { IMovieDTO } from '@src/modules/movies/dtos/IMovieDTO';

export default class FindWinningGapService {
  public async execute(): Promise<any> {
      const producers: IProducerDTO[] = db.get('producers').value();
      const movies: IMovieDTO[] = db
        .get('movies')
        .filter({ winner: true })
        .value();

      // Função para calcular o intervalo em anos entre duas vitórias de um produtor
      function getIntervalBetweenWins(producerName: string): any {
        const producerMovies = movies.filter(movie =>
          movie.producers.includes(producerName),
        );
        if (producerMovies.length >= 2) {
          const sortedYears = producerMovies
            .map(movie => parseInt(movie.year))
            .sort((a, b) => a - b);

          return {
            name: producerName,
            interval: sortedYears[sortedYears.length - 1] - sortedYears[0],
            previousWin: sortedYears[0],
            followingWin: sortedYears[sortedYears.length - 1],
          };
        }
        return 0; // Retorna 0 se o produtor tiver menos de duas vitórias
      }

      // Encontrar o maior e menor intervalo
      let maxInterval = 0;
      let minInterval = Infinity;
      let producersWithMaxInterval: any[] = [];
      let producersWithMinInterval: any[] = [];

      producers.forEach(producer => {
        const data = getIntervalBetweenWins(producer.name);

        if (data.interval > maxInterval) {
          maxInterval = data.interval;
          producersWithMaxInterval = [data];
        } else if (data.interval === maxInterval) {
          producersWithMaxInterval.push(data);
        }

        if (data.interval > 0 && data.interval < minInterval) {
          minInterval = data.interval;
          producersWithMinInterval = [data];
        } else if (data.interval === minInterval) {
          producersWithMinInterval.push(data);
        }
      });

      return {
        min: producersWithMinInterval.map(producer => {
          return {
            producer: producer.name,
            interval: minInterval,
            previousWin: producer.previousWin,
            followingWin: producer.followingWin,
          };
        }),
        max: producersWithMaxInterval.map(producer => {
          return {
            producer: producer.name,
            interval: maxInterval,
            previousWin: producer.previousWin,
            followingWin: producer.followingWin,
          };
        }),
      };
  }
}
