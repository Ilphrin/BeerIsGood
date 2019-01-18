const requests = [
  'CREATE TABLE IF NOT EXISTS beers (id INTEGER PRIMARY KEY NOT NULL, name TEXT, type TEXT, brewery TEXT);',
  'CREATE TABLE IF NOT EXISTS version (id INTEGER PRIMARY KEY NOT NULL, version INTEGER);',
];

const versionRequests = [
  [0, 'ALTER TABLE beers ADD COLUMN pic TEXT;'],
  [1, 'ALTER TABLE beers ADD COLUMN color INTEGER;'],
];

const commonReq = {
  getAllBeers: 'SELECT * FROM beers;',
  newBeer: 'INSERT INTO beers (name, type, brewery, pic, color) VALUES (?, ?, ?, ?, ?);',
  rmBeer: 'DELETE FROM beers WHERE id=?',
  updateBeer: 'UPDATE beers SET name=?, type=?, brewery=?, pic=?, color=? WHERE id=?',
  getVersion: 'SELECT * FROM version;',
  addFirstVersion: 'INSERT INTO version (version) VALUES (?);',
  updateVersion: 'UPDATE version SET version=? WHERE id=?',
};

module.exports = {
  requests,
  versionRequests,
  commonReq,
};
