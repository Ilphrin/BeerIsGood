const requests = [
  'CREATE TABLE IF NOT EXISTS beers (id INTEGER PRIMARY KEY NOT NULL, name TEXT, type TEXT, brewery TEXT);',
  'CREATE TABLE IF NOT EXISTS version (id INTEGER PRIMARY KEY NOT NULL, version INTEGER);',
  'CREATE TABLE IF NOT EXISTS achievements (id INTEGER PRIMARY KEY NOT NULL, name TEXT, action TEXT, value INTEGER DEFAULT 1, unlocked INTEGER DEFAULT 0)',
];

const versionRequests = [
  [0, 'ALTER TABLE beers ADD COLUMN pic TEXT;'],
  [1, 'ALTER TABLE beers ADD COLUMN color INTEGER;'],
  [1, 'ALTER TABLE beers ADD COLUMN ibu INTEGER;'],
  [1, 'ALTER TABLE beers ADD COLUMN alcohol DECIMAL;'],
  [1, 'ALTER TABLE beers ADD COLUMN picsecond TEXT;'],
  [1, 'ALTER TABLE beers ADD COLUMN picthird TEXT;'],
  [2, 'ALTER TABLE beers ADD COLUMN stars INTEGER;'],
  [3, 'ALTER TABLE beers ADD COLUMN modified INTEGER default 0'],
  [3, 'INSERT INTO achievements (name, action) VALUES ("Beer practice", "ADD");'],
  [3, 'INSERT INTO achievements (name, action, value) VALUES ("Beer study", "ADD", 5);'],
  [3, 'INSERT INTO achievements (name, action, value) VALUES ("Beer mastery", "ADD", 10);'],
  [3, 'INSERT INTO achievements (name, action) VALUES ("Oups, sorry!", "MOD");'],
  [3, 'INSERT INTO achievements (name, action, value) VALUES ("I am so clumsy", "MOD", 5);'],
  [3, 'INSERT INTO achievements (name, action, value) VALUES ("What a mess", "MOD", 10);'],
];

const commonReq = {
  getAllBeers: 'SELECT * FROM beers;',
  newBeer: 'INSERT INTO beers (name, type, brewery, pic, picsecond, picthird, color, ibu, alcohol, stars) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
  rmBeer: 'DELETE FROM beers WHERE id=?',
  updateBeer: 'UPDATE beers SET name=?, type=?, brewery=?, pic=?, picsecond=?, picthird=?, color=?, ibu=?, alcohol=?, stars=?, modified=1 WHERE id=?',
  getVersion: 'SELECT * FROM version;',
  addFirstVersion: 'INSERT INTO version (version) VALUES (?);',
  updateVersion: 'UPDATE version SET version=? WHERE id=?',
  getBeerCount: 'SELECT COUNT(*) AS c FROM beers;',
  getModifiedBeerCount: 'SELECT COUNT(*) AS c FROM beers WHERE modified=1;',
};

const achievementsReq = {
  getAddAchievements: 'SELECT * FROM achievements WHERE action LIKE "ADD";',
  getModAchievements: 'SELECT * FROM achievements WHERE action LIKE "MOD";',
  unlockAchievement: 'UPDATE achievements SET unlocked=1 WHERE id=?;',
};

module.exports = {
  requests,
  versionRequests,
  achievementsReq,
  commonReq,
};
