import axios from "axios";
import { Tokens, User } from "./models";
import { IRegisterParams } from "./types";

export const apiV1 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "v1/",
});

export class AuthAPI {
  static register = async (params: IRegisterParams) => {
    return apiV1.post<User>("register/", params);
  };

  static auth = async (params: FormData) => {
    return apiV1.post<Tokens>("token/", params);
  };

  // static getUser = async () => {};
}
