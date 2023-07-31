import db from '@src/shared/infra/lowdb/db';
import { IProducerDTO } from '../dtos/IProducerDTO';
import { IMovieDTO } from '@src/modules/movies/dtos/IMovieDTO';
import { GetIntervalBetweenWins } from '@src/utils/GetIntervalBetweenWins';

export default class FindWinningGapService {
  public async execute(): Promise<any> {
    const producers: IProducerDTO[] = db.get('producers').value();
    const movies: IMovieDTO[] = db
      .get('movies')
      .filter({ winner: true })
      .value();

    let maxInterval = 0;
    let minInterval = Infinity;
    let producersWithMaxInterval: any[] = [];
    let producersWithMinInterval: any[] = [];

    producers.forEach(producer => {
      const data = GetIntervalBetweenWins(movies, producer.name);

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
