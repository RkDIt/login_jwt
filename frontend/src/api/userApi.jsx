import axiosInstance from "./axiosInstance";

export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/auth/user");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/auth/admin");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteUser =  async()=>{
  
}