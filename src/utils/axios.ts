import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false  // setting for cors
});

const axiosTokenApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: false  // setting for cors
});

// Set the AUTH token for any request
axiosTokenApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token');  // Adjust this if you're using a different storage or key name
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export { axiosTokenApi };
export default axiosApi;