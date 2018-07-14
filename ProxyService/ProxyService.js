/* 2018/7/13 */
const log4js = require('log4js');

const logger = log4js.getLogger('ProxyService');

function resolve(requestData, responseCallback) {
    if (requestData == null) {
        responseCallback(null);
        return;
    }

    const service = this;

    let httpClientOptions = service.getHttpClientOptions(requestData);
    let httpClient = this.getHttpClient();

    const request = httpClient.request(httpClientOptions, (response) => {
        logger.debug(`HTTP status: ${response.statusCode}`);
        logger.debug(`HTTP headers: ${JSON.stringify(response.headers)}`);
        response.setEncoding('utf8');
        let responseBody = [];
        response.on('data', (chunk) => {
            responseBody.push(Buffer.from(chunk));
        });
        response.on('end', () => {
            responseBody = Buffer.concat(responseBody).toString();

            logger.info(responseBody);

            responseCallback(responseBody);
        });
    });

    request.on('error', (err) => {
        logger.error(`Problem with request: ${err.message}`);
        responseCallback(null);
    });

    request.end();
}

function RedirectService() {
    this.resolve = resolve;
}

module.exports = RedirectService;