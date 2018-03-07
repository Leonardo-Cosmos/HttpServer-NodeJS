/* 2017/5/24 */
const xml2js = require('xml2js');

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
    console.log(message);
  }
}

exports._logDetail = (element) => {
  if (this._enableLogDetail) {
    console.dir(element);
  }
}

/**
 * Parses XML and invokes calback by passing converted JSON.
 */
exports.parseString = (xml, jsonCallback) => {
  xml2js.parseString(xml, function(err, js) {
    if (err != null) {
      console.error(err);
      return;
    }

    jsonCallback(js);
  });
};

/**
 * Extracts sub element with specified key from an element.
 */
exports.extractSubElement = (element, subKey) => {
  
  this._logSummary(`Extract "${subKey}".`);
  this._logDetail(element);  

  var subElement = element[subKey];
  if (typeof subElement === 'undefined') {
    subElement = null;

    // Search sub element in all namespace.
    subKeys = Object.keys(element);
    for (i = 0; i < subKeys.length; i++) {
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
 * Extracts sub element with specified key from first element of array.
 */
exports.extractFirstSubElement = (elements, subKey) => {
  if (typeof elements === 'undefined' || elements == null) {
    return null;
  }

  this._logSummary(`Extract first "${subKey}".`);
  this._logDetail(elements);

  var subELement = this.extractSubElement(elements[0], subKey);
  return subELement;
};
