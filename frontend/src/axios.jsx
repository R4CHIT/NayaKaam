import axios from "axios";

const instance = axios.create({
  // baseURL: "https://nayakaam.onrender.com/",
  baseURL:"http://127.0.0.1:8000/",
});

const refreshInstance = axios.create({
  // baseURL: "https://nayakaam.onrender.com/",
  baseURL:"http://127.0.0.1:8000/",
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshtoken");
      if (!refreshToken) {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        return Promise.reject(error);
      }

      try {
        const res = await refreshInstance.post(
          "/api/token/refresh/",
          { refresh: refreshToken }
        );

        const { access, refresh } = res.data;

        localStorage.setItem("accesstoken", access);
        if (refresh) localStorage.setItem("refreshtoken", refresh);

        instance.defaults.headers.common["Authorization"] =
          `Bearer ${access}`;
        originalRequest.headers["Authorization"] =
          `Bearer ${access}`;

        return instance(originalRequest);
      } catch {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
