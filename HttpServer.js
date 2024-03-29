/* 2017/1/25 */
const finalhandler = require('finalhandler');
const http = require('http');
const https = require('https');
const fs = require('fs');
const Router = require('router');

const log4js = require('log4js');
log4js.configure({
  appenders: { console: { type: 'stdout'} },
  categories: { default: { appenders: ['console'], level: 'debug' } }
});

const httpHandler = require('./Handler/HttpHandler');

const logger = log4js.getLogger('HttpServer');

const SampleConstJsonService = require('./JsonService/Impl/SampleConstJsonService');
const SampleBodyJsonService = require('./JsonService/Impl/SampleBodyJsonService');
const SampleUrlJsonService = require('./JsonService/Impl/SampleUrlJsonService');

const SampleSoapService = require('./SoapService/Impl/SampleSoapService');

const SampleProxyService = require('./ProxyService/Impl/SampleProxyService');

const httpPort = 32080;
const httpsPort = 32443;
const headerKeyContentType = 'Content-Type';
const plainTextUtf8 = 'text/plain; charset=utf-8';
const jsonUtf8 = 'application/json; charset=utf-8';
const xmlUtf8 = 'text/xml; charset=utf-8';
const headerKeyOrigin = 'origin';
const headerKeyAccessControlAllowOrigin = 'Access-Control-Allow-Origin';

var router = Router();
router.get('/', function(request, response) {
  response.setHeader(headerKeyContentType, plainTextUtf8);
  httpHandler.handleReqBodyResSync(request, response, (requestBody) => {
    return 'HTTP server';
  });
});

router.post('/json', function(request, response) {
  response.setHeader(headerKeyContentType, jsonUtf8);
  httpHandler.handleReqBodyResAsync(request, response, (requestBody, responseCallback) => {
    var requestJson = JSON.parse(requestBody);
    var responseJson = requestJson;
    responseCallback(JSON.stringify(responseJson));
  });
});

let sampleConstJsonService = new SampleConstJsonService();
router.get('/sample/json/const', function(request, response) {
  response.setHeader(headerKeyContentType, jsonUtf8);
  httpHandler.handleConstReqAsyncRes(request, response, sampleConstJsonService);
});

let sampleBodyJsonService = new SampleBodyJsonService();
router.post('/sample/json/body', function(request, response) {
  response.setHeader(headerKeyContentType, jsonUtf8);
  httpHandler.handleReqBodyResAsync(request, response, sampleBodyJsonService);
});

let sampleUrlJsonService = new SampleUrlJsonService();
router.get('/sample/json/url', function(request, response) {
  response.setHeader(headerKeyContentType, plainTextUtf8);
  httpHandler.handleReqUrlResAsync(request, response, sampleUrlJsonService);
});

let sampleSoapService = new SampleSoapService();
router.post('/sample/soap', function(request, response) {
  response.setHeader(headerKeyContentType, xmlUtf8);
  httpHandler.handleReqDataResAsync(request, response, sampleSoapService);
});

let sampleProxyService = new SampleProxyService();
router.get('/sample/proxy/*', function(request, response) {
  let origin = request.headers[headerKeyOrigin];
  if (origin) {
    response.setHeader(headerKeyAccessControlAllowOrigin, origin);
  }
  response.setHeader(headerKeyContentType, jsonUtf8);
  httpHandler.handleReqDataResAsync(request, response, sampleProxyService);
});

// Create HTTP server.
http.createServer(function(request, response) {
  router(request, response, finalhandler(request, response));
}).listen(httpPort);

logger.info(`HTTP server is running on http://127.0.0.1:${httpPort}/`);

// Create HTTPS server.
const options = {
  key: fs.readFileSync('Keys/server.key'),
  cert: fs.readFileSync('Keys/server.crt')
};

https.createServer(options, function(request, response) {
  router(request, response, finalhandler(request, response));
}).listen(httpsPort);

logger.info(`HTTPS server is running on https://127.0.0.1:${httpsPort}/`);
