import { SQLite } from 'expo';
import requests from './init/init';

const db = SQLite.openDatabase('beerIsGood');

function defaultErrCallback(transaction, error) {
  console.warn(`[ERR] In transaction ${transaction}: ${error}`);
}

function defaultSuccessCallback(transaction, result) {
  console.log(`[LOG] Success in transaction ${transaction}: ${result}`);
}

function request(db, callback, success = () => {}, error = () => {}) {
  db.transaction(callback, error, success);
}

function init() {
  request(db, tx => {
    for (req of requests) {
      tx.executeSql(req, []);
    }
  });
}

function get_all(db, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, (tx) => {
    return tx.executeSql('SELECT * FROM beers;', [], success, error)
  });
}

function new_beer(db, beer, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, (tx) => {
    return tx.executeSql(
      'insert into beers (name, type, brewery, pic) values (?, ?, ?, ?);',
      [beer.name, beer.type, beer.brewery, beer.photo],
      success,
      error
    );
  });
}

function rm_beer(db, beerId, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, (tx) => {
    return tx.executeSql(
      'DELETE FROM beers WHERE id = ?',
      [beerId],
      success,
      error
    );
  });
}

init();

const sql = {
  db,
  get_all,
  new_beer,
  rm_beer
};

export default sql;
