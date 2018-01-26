/* 2018/1/25 */
const util = require('util');
const fileHandler = require('../Handler/FileHandler');
const JsonService = require('./JsonService');

function resolve(responseCallback) {
  let mockFilePath = this.getMockPath();

  fileHandler.readFile((responseBody) => {
    responseCallback(responseBody);
  }, mockFilePath);
}

function ConstJsonService() {
  JsonService.call(this);

  this.resolve = resolve;
}
util.inherits(ConstJsonService, JsonService);

module.exports = ConstJsonService;
