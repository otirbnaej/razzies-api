import { IMovieDTO } from '@src/modules/movies/dtos/IMovieDTO';

interface IInterval {
  name: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export const GetIntervalBetweenWins = (
  movies: IMovieDTO[],
  producerName: string,
): IInterval | any => {
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
  return 0;
};
