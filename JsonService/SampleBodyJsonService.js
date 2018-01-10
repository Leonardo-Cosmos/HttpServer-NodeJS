/* 2018/1/9 */
const dateFormat = require('dateformat');
const fileHandler = require('../Handler/FileHandler');

const dataPathFormat = '.\\%key%.json';
const keyPlaceHolder = '%key%';
const defaultKey = 'default';
const logPathFormat = '.\\log\\%key%(%date%).json';
const datePlaceHolder = '%date%';
const logDateFormat = 'yyyy-mm-dd--HH-MM-ss';

function getKey(json) {
  return json.property;
}

function getFilePath(key) {
  return dataPathFormat.replace(keyPlaceHolder, key);
}

function getLogPath(key) {
  var now = new Date();
  var currentDate = dateFormat(now, logDateFormat);
  return logPathFormat.replace(keyPlaceHolder, key).replace(datePlaceHolder, currentDate);
}

module.exports = (requestBody, responseCallback) => {
  if (requestBody == null) {
    responseCallback(null);
  }
  var requestJson = JSON.parse(requestBody);
  var key = getKey(requestJson);
  
  fileHandler.writeFile(requestBody, getLogPath(key));
  fileHandler.readFile((responseBody) => {
    responseCallback(responseBody);
  }, getFilePath(key), getFilePath(defaultKey));
}
