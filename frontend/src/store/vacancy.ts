import { AxiosResponse } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";
import { Position } from "../api/v1/models";
import { VacancyAPI } from "../api/v1/vacancy";
import { errorHandler } from "../utils/errorsHandler";

export class VacancyStore {
  vacancies?: IPromiseBasedObservable<AxiosResponse<Position[]>> = undefined;
  query?: string = undefined;

  constructor() {
    this.get();

    makeAutoObservable(this);
  }

  get = async () => {
    try {
      this.vacancies = fromPromise(VacancyAPI.get(this.query));
    } catch (error) {
      errorHandler(error);
    }
  };

  add = async (params: string) => {
    try {
      await VacancyAPI.add(params);

      this.vacancies = fromPromise(VacancyAPI.get(this.query));
    } catch (error) {
      errorHandler(error);
    }
  };

  delete = async (id: number) => {
    try {
      await VacancyAPI.delete(id)

      this.vacancies = fromPromise(VacancyAPI.get(this.query))
    } catch (error) {
      errorHandler(error)
    }
  }
}

export const vacancyStore = new VacancyStore();
