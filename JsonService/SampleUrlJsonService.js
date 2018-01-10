/* 2018/1/10 */
const url = require('url');
const dateFormat = require('dateformat');
const fileHandler = require('../Handler/FileHandler');

const responsePathFormat = '.\\%key%.json';
const keyPlaceHolder = '%key%';
const defaultKey = 'default';
const logPathFormat = '.\\log\\%key%(%date%).json';
const datePlaceHolder = '%date%';
const logDateFormat = 'yyyy-mm-dd--HH-MM-ss';

function getKey(query) {
    return query.parameter;
}

function getFilePath(key) {
  return responsePathFormat.replace(keyPlaceHolder, key);
}

function getLogPath(key) {
  var now = new Date();
  var currentDate = dateFormat(now, logDateFormat);
  return logPathFormat.replace(keyPlaceHolder, key).replace(datePlaceHolder, currentDate);
}

module.exports = (requestUrl, responseCallback) => {
  if (requestUrl == null) {
    responseCallback(null);
  }
  var requestQuery = url.parse(requestUrl, true).query;
  console.log(requestQuery);
  var key = getKey(requestQuery);
  
  fileHandler.writeFile(JSON.stringify(requestQuery), getLogPath(key));
  fileHandler.readFile((responseBody) => {
    responseCallback(responseBody);
  }, getFilePath(key), getFilePath(defaultKey));
}
