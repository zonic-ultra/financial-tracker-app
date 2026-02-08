import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
  // validateStatus: () => true, // ⬅️ You can include this globally
});

export default api;
