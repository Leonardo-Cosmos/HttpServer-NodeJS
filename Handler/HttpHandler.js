/* 2017/12/25 */

exports.handleReqConstResSync = (request, response, syncService) => {
  response.on('error', function(err) {
    console.error(err);
  });

  var responseBody = syncService.resolve();
  if (responseBody != null) {
    response.statusCode = 200;
    response.end(responseBody);
    } else {
    response.statusCode = 404;
    response.end();
  }
}

exports.handleReqConstResAsync = (request, response, asyncService) => {
  response.on('error', function(err) {
    console.error(err);
  });

  asyncService.resolve(function(responseBody) {
    if (responseBody != null) {
      response.statusCode = 200;
      response.write(responseBody);
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}

exports.handleReqUrlResSync = (request, response, syncService) => {
  response.on('error', function(err) {
    console.error(err);
  });

  var requestUrl = request.url;
  var responseBody = syncService.resolve(requestUrl);
  if (responseBody != null) {
    response.statusCode = 200;
    response.end(responseBody);
    } else {
    response.statusCode = 404;
    response.end();
  }
}

exports.handleReqUrlResAsync = (request, response, asyncService) => {
  response.on('error', function(err) {
    console.error(err);
  });
  
  var requestUrl = request.url;
  asyncService.resolve(requestUrl, function(responseBody) {
    if (responseBody != null) {
      response.statusCode = 200;
      response.write(responseBody);
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}

exports.handleReqBodyResSync = (request, response, syncService) => {
  var requestBody = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    requestBody.push(chunk);
  }).on('end', function() {
    requestBody = Buffer.concat(requestBody).toString();

    response.on('error', function(err) {
      console.error(err);
    });

    var responseBody = syncService.resolve(requestBody);
    if (responseBody != null) {
      response.statusCode = 200;
      response.end(responseBody);
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}

exports.handleReqBodyResAsync = (request, response, asyncService) => {
  var requestBody = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    requestBody.push(chunk);
  }).on('end', function() {
    requestBody = Buffer.concat(requestBody).toString();

    response.on('error', function(err) {
      console.error(err);
    });

    asyncService.resolve(requestBody, function(responseBody) {
      if (responseBody != null) {
        response.statusCode = 200;
        response.write(responseBody);
        response.end();
      } else {
        response.statusCode = 404;
        response.end();
      }
    });
  });
}

exports.handleReqDataResSync = (request, response, syncService) => {
  var requestUrl = request.url;
  var requestHeaders = request.headers;
  var requestBody = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    requestBody.push(chunk);
  }).on('end', function() {
    requestBody = Buffer.concat(requestBody).toString();

    var requestData = {
      url: requestUrl,
      headers: requestHeaders,
      body: requestBody
    };

    response.on('error', function(err) {
      console.error(err);
    });

    var responseBody = syncService.resolve(requestData);
    if (responseBody != null) {
      response.statusCode = 200;
      response.end(responseBody);
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}

exports.handleReqDataResAsync = (request, response, asyncService) => {
  var requestUrl = request.url;
  var requestHeaders = request.headers;
  var requestBody = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    requestBody.push(chunk);
  }).on('end', function() {
    requestBody = Buffer.concat(requestBody).toString();

    var requestData = {
      url: requestUrl,
      headers: requestHeaders,
      body: requestBody
    };

    response.on('error', function(err) {
      console.error(err);
    });

    asyncService.resolve(requestData, function(responseBody) {
      if (responseBody != null) {
        response.statusCode = 200;
        response.write(responseBody);
        response.end();
      } else {
        response.statusCode = 404;
        response.end();
      }
    });
  });
}

/*
module.exports = {
  handleConstReqSyncRes: handleConstReqSyncRes,
  handleConstReqAsyncRes: handleConstReqAsyncRes
}*/
