/* 2017/1/25 */
var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');

var bodySyncHandler = require('./Handler/RequestBodySyncHandler');
var bodyAsyncHandler = require('./Handler/RequestBodyAsyncHandler');
var urlSyncHandler = require('./Handler/RequestUrlSyncHandler');
var urlAsyncHandler = require('./Handler/RequestUrlAsyncHandler');

const port = 9010;
const contentType = 'Content-Type';
const plainTextUtf8 = 'text/plain; charset=utf-8';
const jsonUtf8 = 'application/json; charset=utf-8';
const xmlUtf8 = 'text/xml; charset=utf-8';

var router = Router();
router.get('/', function(request, response) {
  response.setHeader(contentType, plainTextUtf8);
  bodySyncHandler(request, response, (requestBody) => {
    return 'HTTP server';
  });
});

router.post('/json', function(request, response) {
  response.setHeader(contentType, jsonUtf8);
  bodyAsyncHandler(request, response, (requestBody, responseCallback) => {
    var requestJson = JSON.parse(requestBody);
    var responseJson = requestJson;
    responseCallback(JSON.stringify(responseJson));
  });
});

http.createServer(function(request, response) {
  router(request, response, finalhandler(request, response));
}).listen(port);

console.log("HTTP server is running on http://127.0.0.1:" + port + "/");
