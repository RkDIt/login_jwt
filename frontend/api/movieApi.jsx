import axiosInstance from "./axiosInstance";

export const slideMovies = async () => {
  try {
    const response = await axiosInstance.get("/movie/carousel");
    return response.data;
  } catch(error) {
    console.log(error)
  }
};

export const recList =  async()=>{
    try {
        const response = await axiosInstance.get("/movie/recMovies")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
