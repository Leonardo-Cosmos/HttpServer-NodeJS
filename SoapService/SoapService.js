/* 2018/1/22 */
const dateFormat = require('dateformat');
const fileHandler = require('../Handler/FileHandler');
const xmlHandler = require('../Handler/XmlHandler');

/**
 * Get SOAP action from HTTP request headers.
 * 
 * @param {*} requestData 
 * @returns {string} SOAP action.
 */
function getActionFromHeaders(requestData) {
  let requestHeaders = requestData.headers;
  let action = requestHeaders.soapaction;
  return action;
}

function resolve(requestData, responseCallback) {
  if (requestData == null) {
    responseCallback(null);
  }

  const service = this;
  const requestBody = requestData.body;

  xmlHandler.parseString(requestBody, (requestJson) => {
    const operation = service.getOperation(requestData);

    if (operation == null) {
      console.error(`Web service operation is not found.`);
      responseCallback('');
      return;
    }

    let key = operation.getKey(requestJson);
    let logFilePath = operation.getLogPath(key);
    let mockFilePath = operation.getMockPath(key);
    let mockDefaultFilePath = operation.getMockPath(operation.defaultKey);

    if (logFilePath != null) {
      fileHandler.writeFile(requestBody, logFilePath);
    }
    fileHandler.readFile((responseBody) => {
      responseCallback(responseBody);
    }, mockFilePath, mockDefaultFilePath);
  });
}

function SoapService() {
  this.getActionFromHeaders = getActionFromHeaders;
  this.resolve = resolve;
}

module.exports = SoapService;
