/* 2018/1/26 */
const util = require('util');
const ConstJsonService = require('../ConstJsonService');
const serviceConfig = require('./SampleConstJsonService-config')

function SampleConstJsonService() {
    ConstJsonService.call(this);

    this.config = serviceConfig;
}

module.exports = SampleConstJsonService;
