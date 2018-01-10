/* 2018/1/9 */
const dateFormat = require('dateformat');
const fileHandler = require('../Handler/FileHandler');
const xmlHandler = require('../Handler/XmlHandler');

const dataPathFormat = '.\\Response(%key%).xml';
const keyPlaceHolder = '%key%';
const defaultKey = 'Not found';
const logPathFormat = '.\\Request(%key%)(%date%).xml';
const datePlaceHolder = '%date%';
const logDateFormat = 'yyyy-mm-dd--HH-MM-ss';

function getKey(json) {
  let envelop = xmlHandler.extractSubElement(json, 'Envelope');
  let body = xmlHandler.extractSubElement(envelop, 'Body');

  let request = xmlHandler.extractFirstSubElement(body, 'Request');
  let id = xmlHandler.extractFirstSubElement(request, 'ID');

  return id;
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

  xmlHandler.parseString(requestBody, (requestJson) => {
    var key = getKey(requestJson);

    fileHandler.writeFile(requestBody, getLogPath(key));
    fileHandler.readFile((responseBody) => {
      responseCallback(responseBody);
    }, getFilePath(key), getFilePath(defaultKey));
  });
}
