import { api } from "./settings";

export class CandidateAPI {
  static get = async (query?: string) => {
    return api.get(`candidates/?${query}`);
  };
}
