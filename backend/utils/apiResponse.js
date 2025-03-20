class ApiResponse {
  success(res, data = { status: 200, message: "OK", data: {} }) {
    return res.status(data.status).json(data);
  }

  error(res, data) {
    return res.status(data.status).json(data);
  }
}

const responseInstance = new ApiResponse();
export default responseInstance;
