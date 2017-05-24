/* 2017/5/24 */
const xml2js = require('xml2js');

var logElement = false;

/**
 * Sets a value indicating whether print element detail or not.
 */
exports.setLogElement = (value) => {
  logElement = value;
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
  console.log(`Extract "${subKey}".`);
  if (logElement) {
    console.dir(element);
  }

  var subELement = element[subKey];
  if (typeof subElement === 'undefined') {
    // Search sub element in all namespace.
    subKeys = Object.keys(element);
    for (i = 0; i < subKeys.length; i++) {
      if (subKeys[i].endsWith(':' + subKey)) {
        subELement = element[subKeys[i]];
        break;
      }
    }
  }

  console.log(`Found ${subKey}`);
  if (logElement) {
    console.dir(subELement);
  }
  return subELement;
};

/**
 * Extracts sub element with specified key from first element of array.
 */
exports.extractFirstSubElement = (elements, subKey) => {
  console.log(`Extract first "${subKey}".`);
  if (logElement) {
    console.dir(elements);
  }

  var subELement = this.extractSubElement(elements[0], subKey);
  return subELement;
};
