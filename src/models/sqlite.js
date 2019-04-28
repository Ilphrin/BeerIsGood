import { SQLite } from 'expo';
import { requests, versionRequests, commonReq } from './init/init';
import packageJSON from '../../package.json';
import { hasNewAchievement, unlockAchievement } from './achievement';

function defaultErrCallback() {
}

function defaultSuccessCallback() {
}

function request(db, callback, success, error) {
  db.transaction(callback, error, success);
}

function getCount(db, countRequest, callback) {
  request(db, tx => (
    tx.executeSql(
      countRequest,
      [],
      (t, res) => {
        callback(res.rows._array[0].c);
      },
      (t, err) => {
        console.error(err);
      },
    )
  ));
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
      [beer.name, beer.type, beer.brewery, beer.pic, beer.picsecond,
        beer.picthird, beer.color, beer.ibu, beer.alcohol, beer.stars],
      async (t, res) => {
        // We have to compare with previous achievements and check if there is a new one
        let achievement = await hasNewAchievement(db, 'ADD');
        getCount(db, commonReq.getBeerCount, (count) => {
          if (achievement && count >= achievement.value) {
            unlockAchievement(db, achievement);
          } else {
            achievement = null;
          }
          success(t, res, achievement);
        });
      },
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
  console.log(beer);
  request(db, tx => (
    tx.executeSql(
      commonReq.updateBeer,
      [beer.name, beer.type, beer.brewery, beer.pic, beer.picsecond,
        beer.picthird, beer.color, beer.ibu, beer.alcohol, beer.stars, beer.id],
      async (t, res) => {
        let achievement = await hasNewAchievement(db, 'MOD');
        getCount(db, commonReq.getModifiedBeerCount, (count) => {
          if (achievement && count >= achievement.value) {
            unlockAchievement(db, achievement);
          } else {
            achievement = null;
          }
          success(t, res, achievement);
        });
      },
      error,
    )
  ));
}

const db = SQLite.openDatabase('beerIsGood');
const LATEST_VERSION = packageJSON.dataVersion;

function runBasicDatabaseRequests(tx) {
  for (const req of requests) {
    tx.executeSql(req, [], defaultSuccessCallback, defaultErrCallback);
  }
}

function runVersionnedRequests(tx, version) {
  for (const req of versionRequests) {
    if (req[0] > version) {
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
