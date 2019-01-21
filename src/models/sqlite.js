import { SQLite } from 'expo';
import { requests, versionRequests, commonReq } from './init/init';
import packageJSON from '../../package.json';

function defaultErrCallback(transaction, error) {
  console.warn('[ERR] In transaction ', transaction, error);
}

function defaultSuccessCallback(transaction, result) {
  console.log(`[LOG] Success in transaction ${JSON.stringify(transaction)} =====> ${JSON.stringify(result)}`);
}

function request(db, callback, success = () => {}, error = () => {}) {
  db.transaction(callback, error, success);
}


function get_all(db, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(commonReq.getAllBeers, [], success, error)
  ));
}

function new_beer(db, beer, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(
      commonReq.newBeer,
      [beer.name, beer.type, beer.brewery, beer.pic, beer.color, beer.ibu, beer.alcohol],
      success,
      error,
    )
  ));
}

function rm_beer(db, beerId, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(
      commonReq.rmBeer,
      [beerId],
      success,
      error,
    )
  ));
}

function update_beer(db, beer, success = defaultSuccessCallback, error = defaultErrCallback) {
  request(db, tx => (
    tx.executeSql(
      commonReq.updateBeer,
      [beer.name, beer.type, beer.brewery, beer.pic, beer.color, beer.ibu, beer.alcohol, beer.id],
      success,
      error,
    )
  ));
}

const db = SQLite.openDatabase('beerIsGood');
const LATEST_VERSION = packageJSON.dataVersion;

function runBasicDatabaseRequests(tx) {
  for (const req of requests) {
    console.log(req);
    tx.executeSql(req, [], defaultSuccessCallback, defaultErrCallback);
  }
}

function runVersionnedRequests(tx, version) {
  for (const req of versionRequests) {
    if (req[0] > version) {
      console.log(req[1]);
      tx.executeSql(req[1], [], defaultSuccessCallback, defaultErrCallback);
    }
  }
  // Version id will always be 1, but we add one for consideration of future dev
  tx.executeSql(commonReq.updateVersion, [LATEST_VERSION, 1], defaultSuccessCallback, defaultErrCallback);
}

function init() {
  request(db, (tx) => {
    tx.executeSql(commonReq.getVersion, [], (transaction, result) => {
      const res = result.rows._array;
      if (res.length === 0 || res[0] === null) {
        runVersionnedRequests(tx, 0);
        // There is an app but not yet version
        tx.executeSql(commonReq.createVersion, [], defaultSuccessCallback, defaultErrCallback);
        tx.executeSql(
          commonReq.addFirstVersion,
          [],
          defaultSuccessCallback,
          defaultSuccessCallback,
        );
      } else {
        // WORKING
        const { version } = res[0];
        runVersionnedRequests(tx, version);
      }
    }, () => {
      // First time the app launches
      runBasicDatabaseRequests(tx);
      tx.executeSql(commonReq.addFirstVersion, [0], defaultSuccessCallback, defaultErrCallback);
      runVersionnedRequests(tx, -1);
    });
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
