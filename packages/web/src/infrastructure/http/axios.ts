import axios from "axios";
console.log(import.meta.env.VITE_API_URL)
const HttpApi = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
export default HttpApi