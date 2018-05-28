/* 2018/1/22 */
const dateFormat = require('dateformat');
const fileHandler = require('../Handler/FileHandler');
const xmlHandler = require('../Handler/XmlHandler');
const log4js = require('log4js');

const logger = log4js.getLogger('soapService');

/**
 * Get SOAP action from HTTP request headers.
 * 
 * @param {*} requestHeaders 
 * @returns {string} SOAP action.
 */
function getActionFromHttpHeaders(requestHeaders) {
  let action = requestHeaders.soapaction;
  return action;
}

/**
 * Get SOAP action from envelope headers of XML request (converted to JSON).
 * 
 * @param {*} requestJson 
 * @returns {string} SOAP action.
 */
function getActionFromEnvelopeHeaders(requestJson) {
  let envelop = xmlHandler.extractSubElement(requestJson, 'Envelope');
  let header = xmlHandler.extractSubElement(envelop, 'Header');
  let action = xmlHandler.extractFirstSubElement(header, 'Action');
  return xmlHandler.extractFirstSubElement(action, '_');
}

function resolve(requestData, responseCallback) {
  if (requestData == null) {
    responseCallback(null);
  }

  const service = this;
  const requestHeaders = requestData.headers;
  const requestBody = requestData.body;

  xmlHandler.parseString(requestBody, (requestJson) => {

    let operationName;
    switch (service.actionType) {
      case 'HTTP':
        operationName = getActionFromHttpHeaders(requestHeaders);
        break;
      case 'Envelope':
        operationName = getActionFromEnvelopeHeaders(requestJson);
        break;
    }

    let operation = service.getOperation(operationName);

    if (operation == null) {
      logger.error(`Web service operation ${operationName} is not found.`);
      responseCallback('');
      return;
    }

    let key = null;
    try {
      key = operation.getKey(requestJson);
    } catch (err) {
      logger.error(err);
      return;
    }
    let logFilePath = operation.getLogPath(key);
    let mockFilePath = operation.getMockPath(key);
    let mockDefaultFilePath = operation.getMockPath(operation.config.defaultKey);

    if (logFilePath != null) {
      fileHandler.writeFile(requestBody, logFilePath);
    }
    fileHandler.readFile((responseBody) => {
      responseCallback(responseBody);
    }, mockFilePath, mockDefaultFilePath);
  });
}

function SoapService() {
  this.getActionFromHttpHeaders = getActionFromHttpHeaders;
  this.resolve = resolve;
}

module.exports = SoapService;
