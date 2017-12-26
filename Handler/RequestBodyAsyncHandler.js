/* 2017/1/25 */
module.exports = (request, response, processor) => {
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

    processor(requestBody, function(responseBody) {
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
