import axiosInstance from "./axiosInstance";

export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/auth/user");
    // console.log(response);
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


export const deleteUser =  async(id)=>{
  try {
    const userId = id;
    const response  = await axiosInstance.delete(`/auth/admin/user/${userId}`)
    console.log(response);
  } catch (errors) {
    console.log(error)  
  }
}
export const editUser = async (userId, editData) => {
  try {
    const response = await axiosInstance.patch(`/auth/admin/user/${userId}`, editData);
    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; 
  }
};


