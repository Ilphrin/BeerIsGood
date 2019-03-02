import { achievementsReq } from './init/init';

function getLatestAchievement(list) {
  for (const achievement of list) {
    if (achievement.unlocked === 0) {
      return achievement;
    }
  }
  return null;
}

function getLatestAddAchievement(db) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(achievementsReq.getAddAchievements, [], (t, res) => {
        const latest = getLatestAchievement(res.rows._array);
        resolve(latest);
      });
    }, reject);
  });
}

function getLatestModAchievement(db) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(achievementsReq.getAddAchievements, [], (t, res) => {
        const latest = getLatestAchievement(res.rows._array);
        resolve(latest);
      });
    }, reject);
  });
}

function hasNewAchievement(db, action) {
  if (action === 'MOD') {
    return getLatestModAchievement(db);
  } else if (action === 'ADD') {
    return getLatestAddAchievement(db);
  } else {
    console.warn('No corresponding achievement action');
    return null;
  }
}

function unlockAchievement(db, achievement) {
  db.transaction((tx) => {
    tx.executeSql(achievementsReq.unlockAchievement, [achievement.id]);
  });
}

module.exports = {
  hasNewAchievement,
  unlockAchievement,
};
