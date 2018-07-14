/* 2018/7/13 */
const util = require('util');
const https = require('https');
const ProxyService = require('../ProxyService');
const serviceConfig = require('./SampleProxyService-config');

function getHttpClient() {
    return https;
}

function getHttpClientOptions(requestData) {

    let requestUrl = requestData.url;
    let localBaseUrl = serviceConfig.localBaseUrl;
    if (requestUrl.indexOf(localBaseUrl) !== 0) {
        return null;
    }

    let resourceUrl = requestUrl.substring(localBaseUrl.length);

    const options = {
        hostname: serviceConfig.remoteDomain,
        path: resourceUrl,
        method: 'GET',
        rejectUnauthorized: false
    };

    return options;
}

function SampleProxyService() {
    ProxyService.call(this);

    this.config = serviceConfig;
    this.getHttpClient = getHttpClient;
    this.getHttpClientOptions = getHttpClientOptions;
}
util.inherits(ProxyService, SampleProxyService);

module.exports = SampleProxyService;
