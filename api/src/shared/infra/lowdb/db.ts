const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');

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

export default db;
