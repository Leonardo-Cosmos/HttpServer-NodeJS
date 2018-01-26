/* 2017/5/23 */
const fs = require('fs');
const path = require('path');
const dateFormat = require('dateformat');

const logDateFormat = 'yyyy-mm-dd HH:MM:ss';

function readExistingFile(dataFilePath, callback) {
  var buffer = [];
  var fileReadStream = fs.createReadStream(dataFilePath);
  fileReadStream.on('data', (chunk) => {
    buffer.push(chunk);
  });
  fileReadStream.on('end', () => {
    buffer = Buffer.concat(buffer).toString();
    callback(buffer);
  });
}

/**
 * Reads a file and passes content to callback.
 * 
 * @param {Function} callback Callback to handle file content.
 * @param {string} filePath Path of file to be read.
 * @param {string} defaultPath Default path. If file is not found, default path will be used.
 */
exports.readFile = (callback, filePath, defaultPath) => {
  var now = dateFormat(new Date(), logDateFormat);
  console.log(`${now} Read file "${filePath}".`);

  if (fs.existsSync(filePath)) {
    readExistingFile(filePath, callback);
  } else if (defaultPath != null && fs.existsSync(defaultPath)) {
    console.log(`Use default file "${defaultPath}".`);
    readExistingFile(defaultPath, callback);
  } else {
    console.error(`File is not found.`);
    callback(null);
  }
};

/**
 * Writes content to a file.
 * 
 * @param {string} content Content to be written to file.
 * @param {string} filePath Path of file to be written.
 */
exports.writeFile = (content, filePath) => {  
  var now = dateFormat(new Date(), logDateFormat);
  console.log(`${now} Write file "${filePath}".`);

  var dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  var fileWriteStream = fs.createWriteStream(filePath);
  fileWriteStream.end(content);
};
