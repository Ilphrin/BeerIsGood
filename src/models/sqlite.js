import { SQLite } from 'expo';
import requests from './init/init';

function defaultErrCallback(transaction, error) {
  console.warn(`[ERR] In transaction ${transaction}: ${error}`);
}

function defaultSuccessCallback(transaction, result) {
  console.log(`[LOG] Success in transaction ${transaction}: ${result}`);
}

function request(db, callback, success = () => {}, error = () => {}) {
  db.transaction(callback, error, success);
}


function get_all(db, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql('SELECT * FROM beers;', [], success, error)
  ));
}

function new_beer(db, beer, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(
      'insert into beers (name, type, brewery, pic) values (?, ?, ?, ?);',
      [beer.name, beer.type, beer.brewery, beer.pic],
      success,
      error,
    )
  ));
}

function rm_beer(db, beerId, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(
      'DELETE FROM beers WHERE id = ?',
      [beerId],
      success,
      error,
    )
  ));
}

function update_beer(db, beer, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(
      'UPDATE beers SET name=?, type=?, brewery=?, pic=? WHERE id=?',
      [beer.name, beer.type, beer.brewery, beer.pic, beer.id],
      success,
      error,
    )
  ));
}

const db = SQLite.openDatabase('beerIsGood');

function init() {
  request(db, (tx) => {
    for (req of requests) {
      tx.executeSql(req, []);
    }
  });
}

init();

const sql = {
  db,
  get_all,
  new_beer,
  rm_beer,
  update_beer,
};

export default sql;
