import axios from "axios";
const axio = axios.create({
  baseURL: "https://likkida-workspace.onrender.com/api",
  timeout: 10000,
  withCredentials: true
});

export default axio