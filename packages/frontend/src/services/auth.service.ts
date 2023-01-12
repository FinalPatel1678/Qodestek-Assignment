import BaseService, { BaseProps } from "./base.service";

import { UserModel } from "../models/UserModel";
import { useEffect } from "react";

export function useAuthService(bearerToken?: string) {
  let authService = new AuthServices({ bearerToken });
  useEffect(() => {
    authService = new AuthServices({ bearerToken });
  }, [bearerToken]);
  return authService;
}

export default class AuthServices extends BaseService {
  constructor(props: BaseProps) {
    super(props);
  }

  logIn = async (username: string, password: string) =>
    await this.callApi<UserModel>(
      "GET",
      "/user/auth",
      new URLSearchParams({ username, password })
    );

  getUserByToken = async () =>
    await this.callApi<UserModel>("GET", "/user/get-user-by-token");
}
