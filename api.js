import axios from "axios";
import https from "https";
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
axios.defaults.httpsAgent = httpsAgent;
const BASE_URL = process.env.API_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosGet = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosPost = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetAll = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
