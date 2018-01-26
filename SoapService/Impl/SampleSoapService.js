/* 2018/1/9 */
const util = require('util');
const dateFormat = require('dateformat');
const xmlHandler = require('../../Handler/XmlHandler');
const SoapService = require('../SoapService');
const serviceConfig = require('./SampleSoapService-config');

const sampleOperation = {
  config: serviceConfig.sample,

  getKey: function(json) {
    let envelop = xmlHandler.extractSubElement(json, 'Envelope');
    let body = xmlHandler.extractSubElement(envelop, 'Body');
  
    let request = xmlHandler.extractFirstSubElement(body, 'Request');
    let id = xmlHandler.extractFirstSubElement(request, 'ID');
  
    return id;
  },
  
  getMockPath: function(key) {
    let config = this.config;
    return config.mockPathFormat.replace(config.keyPlaceHolder, key);
  },
  
  getLogPath: function(key) {
    let config = this.config;
    let now = new Date();
    let currentDate = dateFormat(now, config.logDateFormat);
    return config.logPathFormat.replace(config.keyPlaceHolder, key).replace(config.datePlaceHolder, currentDate);
  }
}

const operationInfos = [
  {
    name: "\"http://www.sample.org/services/SampleSoapSerivce/Sample\"",
    operation: sampleOperation
  }
]

function getOpearation(requestData) {
  let operationName = this.getActionFromHeaders(requestData);
  for (let key in operationInfos) {
    let operationInfo = operationInfos[key];
    if (operationInfo.name == operationName) {
      return operationInfo.operation;
    }
  }
}

function SampleSoapSerivce() {
  SoapService.call(this);

  this.getOpearation = getOpearation;
}
util.inherits(SampleSoapSerivce, SoapService);

module.exports = SampleSoapSerivce;
