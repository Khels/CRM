import { Position } from "./models";
import { api } from "./settings";

export class VacancyAPI {
  static get = async (query?: string) => {
    return api.get<Position[]>(`positions/?${query}`);
  };

  static add = async (params: string) => {
    return api.post("positions/", params);
  };
}
