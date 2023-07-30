import db from '@src/shared/infra/lowdb/db';

export const clearDB = () => {
  db.setState({}).write();

  if (!db.has('movies').value()) {
    db.defaults({ movies: [] }).write();
  }

  if (!db.has('studios').value()) {
    db.defaults({ studios: [] }).write();
  }

  if (!db.has('producers').value()) {
    db.defaults({ producers: [] }).write();
  }
};
