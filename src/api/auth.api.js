/* eslint-disable no-unused-vars */
import { BASE_URL } from "@/constant";
import axios from "axios";
import { toast } from "sonner";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Assuming API is your Axios instance

API.interceptors.response.use(
  (response) => response, // For successful requests, just return the response
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired JWT and we haven't already retried the request

    if (
      error?.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark this request as retried
      try {
        console.log("this refresh access token called");
        const { accessToken } = await refreshAccessToken(); // Assume this function refreshes the token and returns the new one

        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // Set the new token in the Authorization header
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`; // Set the new token in the request's Authorization header
        return API(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // If the token refresh fails, reject the promise
        return Promise.reject(refreshError);
      }
    }
    // For all other errors, just return the promise rejection
    return Promise.reject(error);
  }
);

export const refreshAccessToken = async () => {
  try {
    const { data } = await API.post("/users/refresh-token");
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const registerUser = async (data) => {
  const formData = new FormData();
  //   console.log("data", data);

  if (!data.profileImg) {
    toast.error("Avatar is required");
    return;
  }

  formData.append("avatar", data.profileImg);

  if (data.coverImage) {
    formData.append("coverImage", data.coverImage);
  }
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);

  try {
    const { data } = await API.post("/users/register", formData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export async function loginUser(formData) {
  try {
    // console.log("loginUser called", formData);
    const { data } = await API.post("/users/login", formData);

    return data?.data?.user;
    // console.log("loginUser called", data);
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
}

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    return data?.data?.user;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
