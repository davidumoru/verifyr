function buildFailureResponse (message, statusCode) {
  return {
    status: "failure",
    message,
    statusCode
  }
}

function buildSuccessResponse (message, statusCode) {
    return {
      status: "success",
      message,
      statusCode
    }
  }
  

module.exports = {buildFailureResponse, buildSuccessResponse}