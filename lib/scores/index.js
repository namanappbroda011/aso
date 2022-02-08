'use strict';

const getTraffic = require('./traffic');
const getDifficulty = require('./difficulty');

function build (store) {
  // var queryStartTime = Date.now();
  return function (keyword) {
    keyword = keyword.toLowerCase();
    return store
      .search({term: keyword, num: 30, fullDetail: true})
      .then((apps) => Promise.all([
        getDifficulty(store)(keyword, apps),
        getTraffic(store)(keyword, apps)
      ]))
      .then((results) => ({
        difficulty: results[0],
        traffic: results[1],
        // time:  (Date.now() - queryStartTime)/1000
      }));
  };
}

module.exports = build;
