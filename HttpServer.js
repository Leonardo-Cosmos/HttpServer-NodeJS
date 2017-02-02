/* 2017/1/25 */
var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');

var syncHandler = require('./Handler/SyncHandler');
var asyncHandler = require('./Handler/AsyncHandler');

const port = 9010;
const contentType = 'Content-Type';
const plainTextUtf8 = 'text/plain; charset=utf-8';
const jsonUtf8 = 'application/json; charset=utf-8';

var router = Router();
router.get('/', function(request, response) {
  response.setHeader(contentType, plainTextUtf8);
  syncHandler(request, response, (requestBody) => {
    return 'HTTP server';
  });
});

router.post('/json', function(request, response) {
  response.setHeader(contentType, jsonUtf8);
  asyncHandler(request, response, (requestBody, responseCallback) => {
    var requestJson = JSON.parse(requestBody);
    var responseJson = requestJson;
    responseCallback(JSON.stringify(responseJson));
  });
});

http.createServer(function(request, response) {
  router(request, response, finalhandler(request, response));
}).listen(port);

console.log("HTTP server is running on http://127.0.0.1:" + port + "/");
