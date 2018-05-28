/* 2017/5/24 */
const xml2js = require('xml2js');
const log4js = require('log4js');

const logger = log4js.getLogger('xmlHandler');

exports._enableLogSummary = false;
exports._enableLogDetail = false;

/**
 * Sets a value indicating whether print summary in console.
 * @param {boolean} value 
 */
exports.setLogSummary = function(value) {
  this._enableLogSummary = value;
}

/**
 * Sets a value indicating whether print element detail in console.
 * @param {boolean} value
 */
exports.setLogDetail = (value) => {
  this._enableLogDetail = value;
}

exports._logSummary = (message) => {
  if (this._enableLogSummary) {
    logger.debug(message);
  }
}

exports._logDetail = (element) => {
  if (this._enableLogDetail) {
    logger.debug(element);
  }
}

/**
 * Parses XML and invokes calback by passing converted JSON.
 */
exports.parseString = (xml, jsonCallback) => {
  xml2js.parseString(xml, function(err, js) {
    if (err != null) {
      logger.error(err);
      return;
    }

    jsonCallback(js);
  });
};

/**
 * Extracts sub element with specified key from an element.
 * 
 * @param element Element of start level.
 * @param {string} subKey Key of sub-level.
 * @returns Element of sub-level or text of element.
 */
exports.extractSubElement = (element, subKey) => {
  
  this._logSummary(`Extract "${subKey}".`);
  this._logDetail(element);  

  var subElement = element[subKey];
  if (typeof subElement === 'undefined') {
    subElement = null;

    // Search sub element in all namespace.
    var subKeys = Object.keys(element);
    for (var i = 0; i < subKeys.length; i++) {
      if (subKeys[i].endsWith(':' + subKey)) {
        subElement = element[subKeys[i]];
        break;
      }
    }
  }

  if (subElement != null) {
    this._logSummary(`Found ${subKey}`);
    this._logDetail(subElement);
  }  

  return subElement;
};

/**
 * Extracts sub element with specified key from first element.
 * 
 * @param {array} elements Elements of start level.
 * @param {string} subKey Key of sub-level.
 * @returns Elements of sub-level or text of element.
 */
exports.extractFirstSubElement = (elements, subKey) => {
  if (typeof elements === 'undefined' || elements == null) {
    return null;
  }

  this._logSummary(`Extract first "${subKey}".`);
  this._logDetail(elements);

  var subElement = this.extractSubElement(elements[0], subKey);
  return subElement;
};

/**
 * Extracts sub element recursively with specified keys from first element of every level.
 * 
 * @param {array} elements Elements of start level.
 * @param {array} subKeys Array of key of every sub-level.
 * @returns Final element of sub-level or text of element.
 */
exports.extractFirstSubElementRecursive = (elements, subKeys) => {
  if (typeof elements === 'undefined' || elements == null) {
    return null;
  }

  if (subKeys === 'undefined' || subKeys == null) {
    return elements[0];
  }

  let currentElement = elements;
  for (let subKey in subKeys) {
    if (currentElement == null) {
      return null;
    }
    
    currentElement = this.extractFirstSubElement(currentElement, subKeys[subKey]);
  }

  return currentElement;
};
