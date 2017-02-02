/* 2017/2/2 */
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

    var responseBody = processor(requestBody);
    if (responseBody != null) {
      response.statusCode = 200;
      response.end(responseBody);
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}
