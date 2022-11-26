import { AxiosResponse } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { CandidateAPI } from "../api/v1/candidate";
import { errorHandler } from "../utils/errorsHandler";
import { AddCandidate, Candidate as CandidateType, UpdateCandidate } from "../api/v1/models";

class Candidate {
  candidates?: IPromiseBasedObservable<AxiosResponse<CandidateType[]>> = undefined;
  candidate?: IPromiseBasedObservable<AxiosResponse<CandidateType>> = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getAllCandidatesByVacancyId = async (query?: string) => {
    try {
      runInAction(() => {
        this.candidates = fromPromise(
          CandidateAPI.getAllCandidatesByVacancyId(query)
        );
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  getCandidateById = async (id: number) => {
    try {
      runInAction(() => {
        this.candidate = fromPromise(CandidateAPI.getCandidateById(id));
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  updateCondidate = async (data: UpdateCandidate) => {
    try {
      await CandidateAPI.updateCandidate(data);

      this.candidate = fromPromise(CandidateAPI.getCandidateById(data.id));
    } catch (error) {
      errorHandler(error);
    }
  };

  add = async (data: AddCandidate) => {
    try {
      const candidate = await CandidateAPI.add(data);

      this.candidates = fromPromise(
        CandidateAPI.getAllCandidatesByVacancyId(candidate.data.position.id.toString())
      );
    } catch (error) {
      errorHandler(error);
    }
  };
}

export const candidatesStore = new Candidate();
