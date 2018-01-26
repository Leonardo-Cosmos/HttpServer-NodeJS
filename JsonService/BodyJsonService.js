/* 2018/1/24 */
const util = require('util');
const fileHandler = require('../Handler/FileHandler');
const JsonService = require('./JsonService');

function resolve(requestBody, responseCallback) {
  if (requestBody == null) {
    responseCallback(null);
  }
  let requestJson = JSON.parse(requestBody);
  let key = this.getKey(requestJson);
  let logFilePath = this.getLogPath(key);
  let mockFilePath = this.getMockPath(key);
  let mockDefaultFilePath = this.getMockPath(this.config.defaultKey);

  fileHandler.writeFile(requestBody, logFilePath);
  fileHandler.readFile((responseBody) => {
    responseCallback(responseBody);
  }, mockFilePath, mockDefaultFilePath);
}

function BodyJsonService() {
  JsonService.call(this);

  this.resolve = resolve;
}
util.inherits(BodyJsonService, JsonService);

module.exports = BodyJsonService;
