import { AxiosResponse } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { CandidateAPI } from "../api/v1/candidate";
import { errorHandler } from "../utils/errorsHandler";

class Candidate {
  candidates?: IPromiseBasedObservable<AxiosResponse<Candidate[]>> = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get = async (query?: string) => {
    try {
      runInAction(() => {
        this.candidates = fromPromise(CandidateAPI.get(query));
      });
    } catch (error) {
      errorHandler(error);
    }
  };
}

export const candidatesStore = new Candidate();
