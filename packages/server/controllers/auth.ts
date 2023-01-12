import { Request, Response } from "express";

import { IUserRequest } from "../models/user";
import { UserIdRequest } from "../middlewares/auth";
import { generateToken } from "../utils/generateToken";
import { getAuthService } from "../services/authService";

export const logIn = async (
  req: Request<undefined, undefined, undefined, IUserRequest>,
  res: Response
) => {
  try {
    const authService = getAuthService();

    const result = await authService.getUser(req.query);
    if (result) {
      result.token = generateToken(result._id);

      return res.status(200).send(result);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(500).send("Error while getting user details");
  }
};

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const authService = getAuthService();

    const result = await authService.getUserByToken((req as UserIdRequest).id);
    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(500).send("Error while getting user details");
  }
};
