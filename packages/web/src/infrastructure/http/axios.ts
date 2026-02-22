import axios from "axios";
console.log(import.meta.env.VITE_API_URL)
const api = axios.create({
  baseURL: "https://likkida-workspace.onrender.com/api",
  timeout: 10000,
});
export default api