/* 2017/12/25 */
module.exports = (request, response, processor) => {
  response.on('error', function(err) {
    console.error(err);
  });
  
  var requestUrl = request.url;
  processor(requestUrl, function(responseBody) {
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