import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export interface UserIdRequest extends Request {
  id: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Auth token not provided");
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string };

    if (verified) {
      (req as UserIdRequest).id = verified.id;
      next();
    } else {
      // Access Denied
      return res.status(401).send("Access Denied");
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json("Access Denied");
  }
};
