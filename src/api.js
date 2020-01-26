import axios from "axios";
import {SERVER_URL} from "./constants";

export const createAPI = () => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => err;

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
