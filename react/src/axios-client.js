import axios from "axios";

const axiosClient = axios.create({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.get("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
    } 
    // Can add pages as well. For example, if status code is 403, then we can show forbidden pages.

    throw error;
  }
);

export default axiosClient;
