/* 2018/1/24 */
const util = require('util');
const url = require('url');
const fileHandler = require('../Handler/FileHandler');
const JsonService = require('./JsonService');

function resolve(requestUrl, responseCallback) {
  if (requestUrl == null) {
    responseCallback(null);
  }
  let requestQuery = url.parse(requestUrl, true).query;
  //console.log(requestQuery);
  let key = this.getKey(requestQuery);
  let logFilePath = this.getLogPath(key);
  let mockFilePath = this.getMockPath(key);
  let mockDefaultFilePath = this.getMockPath(this.config.defaultKey);

  if (logFilePath != null) {
    fileHandler.writeFile(JSON.stringify(requestQuery), logFilePath);
  }
  fileHandler.readFile((responseBody) => {
    responseCallback(responseBody);
  }, mockFilePath, mockDefaultFilePath);
}

function UrlJsonService() {
  JsonService.call(this);

  this.resolve = resolve;
}
util.inherits(UrlJsonService, JsonService);

module.exports = UrlJsonService;
