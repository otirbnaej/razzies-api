const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const lowdb = new FileSync('db.json');

module.exports = low(lowdb);