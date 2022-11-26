import { api } from "./settings";
import { Candidate, UpdateCandidate } from "../../api/v1/models";

export class CandidateAPI {
  static getAllCandidatesByVacancyId = async (query?: string) => {
    return api.get(`candidates/?${query}`);
  };

  static getCandidateById = async (id: number) => {
    return api.get<Candidate>(`candidates/${id}`)
  }

  static updateCandidate = async (params: UpdateCandidate) => {
    return api.patch<UpdateCandidate>(`candidates/${params.id}`, {
      first_name: params.first_name,
      middle_name: params.middle_name,
      email: params.email,
      last_name: params.last_name,
      position: params.position
    })
  }
}
