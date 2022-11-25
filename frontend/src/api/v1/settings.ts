import axios from "axios";

// TODO: кринж, но быстро
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
