/* 2018/1/24 */
const dateFormat = require('dateformat');

function getMockPath(key) {
  let config = this.config;
  if (key == null || key == '') {
    return config.mockPath;
  } 

  return config.mockPathFormat.replace(config.keyPlaceHolder, key);
}

function getLogPath(key) {
  let config = this.config;
  if (key == null && key == '') {
    return config.logPath;
  }
  
  let now = new Date();
  let currentDate = dateFormat(now, config.logDateFormat);
  return config.logPathFormat.replace(config.keyPlaceHolder, key).replace(config.datePlaceHolder, currentDate);
}

function JsonService() {
  this.getMockPath = getMockPath;
  this.getLogPath = getLogPath;
}

module.exports = JsonService;
