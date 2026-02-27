import axios from "axios";
const axio = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export default axio