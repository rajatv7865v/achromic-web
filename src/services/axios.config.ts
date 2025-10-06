import * as axios from "axios";
import { toError } from "../utils/error";

let axiosObject = axios.default.create();
axiosObject.defaults.baseURL = "http://localhost:8080/api/v1";
axiosObject.defaults.baseURL = "https://api.test.sharkwaveinfo.com/api/v1";
axiosObject.defaults.timeout = 20000;
axiosObject.defaults.withCredentials = false;
axiosObject.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosObject.interceptors.request.use(
  async function (config: any) {
    let token: any = localStorage.getItem("auth_token");
    if (token) {
      token = JSON.parse(token);
      token = token?.access_token;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

axiosObject.interceptors.response.use(
  async function (config: any) {
    return config;
  },
  function (error: any) {
    return Promise.reject(toError(error));
  }
);

export default axiosObject;
