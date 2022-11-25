import { isAxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { AuthAPI } from "../api/v1/auth";
import { User } from "../api/v1/models";
import { IRegisterParams } from "../api/v1/types";

class AuthStore {
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  register = async (params: IRegisterParams) => {
    try {
      const response = await AuthAPI.register(params);

      runInAction(() => {
        this.user = response.data;
      });
    } catch (e) {
      // TODO:
      if (isAxiosError(e)) {
        console.error(e.response);
      }
    }
  };

  // TODO: прилетает тот же пользователь мб стоит выделить отдельный стор для данных пользователя
  // getUser = async () => {};

  auth = async (params: FormData) => {
    try {
      const response = await AuthAPI.auth(params);

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    } catch (e) {
      // TODO:
      if (isAxiosError(e)) {
        console.error(e.response);
      }
    }
  };
}

export const authStore = new AuthStore();
