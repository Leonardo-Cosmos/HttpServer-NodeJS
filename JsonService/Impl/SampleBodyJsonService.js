/* 2018/1/9 */
const util = require('util');
const BodyJsonService = require('../BodyJsonService');
const serviceConfig = require('./SampleBodyJsonService-config');

function getKey(json) {
  return json.property;
}

function SampleBodyJsonService() {
  BodyJsonService.call(this);

  this.config = serviceConfig;
  this.getKey = getKey;
}

module.exports = SampleBodyJsonService;
