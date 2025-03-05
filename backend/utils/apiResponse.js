class apiResponse {
  success(res, data = { status: 200, message: "OK", data: {} }) {
    return res.status(data.status).json(data);
  }

  error(res, data) {
    return res.status(data.status).json(data);
  }
}

module.exports = new apiResponse();
