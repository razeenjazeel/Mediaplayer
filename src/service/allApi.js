
import { CommonRequest } from "./CommonRequest";
import { BASE_URL } from "./baseUrl";


// Add Video

// define function for add video

export const addVideo = async (body) => {

  return await CommonRequest("POST", `${BASE_URL}/videos`, body)

}

// get video

// define fn for get video from back end

export const getVideo = async () => {
  return await CommonRequest("GET", `${BASE_URL}/videos`, "")
}

// delete video card


export const deleteVideo = async (id) => {
  return await CommonRequest("DELETE", `${BASE_URL}/videos/${id}`, {})
}

// add category


// define a fn for add category

export const addCategory = async (body) => {
  return await CommonRequest("POST", `${BASE_URL}/categories`, body)
}


// to get category

export const getAllCategory=async () =>{
  return await CommonRequest("GET",`${BASE_URL}/categories`,"")
}

// to delete category

export const deleteCategory=async (id)=>{
  return await CommonRequest("DELETE",`${BASE_URL}/categories/${id}`,{})
}

// watchhistory section
// get history

export const getHistory=async()=>{
  return await CommonRequest("GET",`${BASE_URL}/watchHistory`,"")
}

// add hsitory
export const addHistory=async(body)=>{
  return await CommonRequest("POST",`${BASE_URL}/watchHistory`,body)
}


// get single video details

export const getVideos = async (id) => {
  return await CommonRequest("GET", `${BASE_URL}/videos/${id}`, "")
}

// to update drag details in category all videos []


export const updateCategory = async (id,body) => {
  return await CommonRequest("PUT", `${BASE_URL}/categories/${id}`,body)
}

