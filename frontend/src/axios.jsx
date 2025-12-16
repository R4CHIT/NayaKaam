import axios from "axios";

const instance = axios.create({
     baseURL: "https://nayakaam.onrender.com/" 
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshtoken");
        const res = await instance.post("/api/token/refresh/", { refresh: refreshToken });

        const { access, refresh } = res.data;
        localStorage.setItem("accesstoken", access);
        if (refresh) localStorage.setItem("refreshtoken", refresh);

        instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        return instance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        
      }
    }

    return Promise.reject(error);
  }
);

export default instance;