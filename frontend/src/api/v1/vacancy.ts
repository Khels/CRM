import axios from "axios";
import { Position } from "./models";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "v1/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export class VacancyAPI {
  static get = async (query?: string) => {
    return api.get<Position[]>(`positions/?${query}`);
  };

  static add = async (params: string) => {
    return api.post("positions/", params);
  };
}
