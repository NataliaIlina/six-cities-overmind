import axios from "axios";
import {SERVER_URL} from "src/constants";

const API = axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
  withCredentials: true
});

export default API;
