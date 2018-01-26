/* 2018/1/10 */
const util = require('util');
const UrlJsonService = require('../UrlJsonService');
const serviceConfig = require('./SampleUrlJsonService-config');

function getKey(query) {
    return query.parameter;
}

function SampleUrlJsonService() {
  UrlJsonService.call(this);

  this.config = serviceConfig;
  this.getKey = getKey;
}

module.exports = SampleUrlJsonService;
