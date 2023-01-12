import { IUserRequest, IUserResponse, User } from "../models/user";

export interface IAuthService {
  getUser: (userRequest: IUserRequest) => Promise<IUserResponse | null>;
  getUserByToken: (id: string) => Promise<IUserResponse | null>;
}

export const getAuthService = (): IAuthService => {
  const getUser = async (userRequest: IUserRequest) =>
    await User.findOne({
      username: userRequest.username,
      password: userRequest.password,
    }).lean();

  const getUserByToken = async (id: string) => await User.findById(id).lean();

  return {
    getUser,
    getUserByToken,
  };
};
