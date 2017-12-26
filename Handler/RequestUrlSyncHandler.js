/* 2017/12/25 */
module.exports = (request, response, processor) => {
  response.on('error', function(err) {
    console.error(err);
  });

  var requestUrl = request.url;
  var responseBody = processor(requestUrl);
  if (responseBody != null) {
    response.statusCode = 200;
    response.end(responseBody);
    } else {
    response.statusCode = 404;
    response.end();
  }
}
