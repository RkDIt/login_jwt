import axiosInstance from "./axiosInstance";
import {API} from "../utils/Api.jsx"

export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get(API.USER_INDI);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(API.ADMIN);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteUser =  async(id)=>{
  try {
    const userId = id;
    const response  = await axiosInstance.delete(`${API.ADMIN_USER}/${userId}`)
    // console.log(response);
  } catch (errors) {
    console.log(error)  
  }
}
export const editUser = async (userId, editData) => {
  try {
    const response = await axiosInstance.patch(`${API.ADMIN_USER}/${userId}`, editData);
    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; 
  }
};


