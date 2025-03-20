import Response from "../utils/apiResponse.js";
import { registerUser, loginUser } from "../services/authServices.js";
import messages from "../utils/responseMsg.js";

export const registerUser = async (req, res) => {
    try {
        const data = await registerUser(req.body);
        return Response.success(res, { status: 201, data });
    } catch (error) {
        console.error("Error in registerUser:", error);
        return Response.error(res, { 
            status: error.status || 500, 
            message: error.message || messages.SERVER_ERROR 
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const data = await loginUser(req.body);
        return Response.success(res, { status: 200, data });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return Response.error(res, { 
            status: error.status || 500, 
            message: error.message || messages.SERVER_ERROR 
        });
    }
};
