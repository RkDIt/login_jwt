const Response = require("../utils/apiResponse");
const userService = require("../services/userServices");
const messages = require("../utils/responseMsg");

const registerUser = async (req, res) => {
    try {
        const data = await userService.registerUser(req.body);
        return Response.success(res, { status: 201, data });
    } catch (error) {
        console.error("Error in registerUser:", error);
        return Response.error(res, { 
            status: error.status || 500, 
            message: error.message || messages.SERVER_ERROR 
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const data = await userService.loginUser(req.body);
        return Response.success(res, { status: 200, data });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return Response.error(res, { 
            status: error.status || 500, 
            message: error.message || messages.SERVER_ERROR 
        });
    }
};

module.exports = { registerUser, loginUser };
