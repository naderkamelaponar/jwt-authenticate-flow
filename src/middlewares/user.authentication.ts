import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const unAuthorized = (next: NextFunction) => {
  const error: Error = new Error("Unauthorized user");

  next(error);
};
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get("authorization");

    console.log(token);
    if (token) {
      const decode = jwt.verify(token, config.tokenSecret as string);
      if (decode) {
        next();
      } else {
        unAuthorized(next);
      }
    } else {
      unAuthorized(next);
    }
  } catch (error) {
    unAuthorized(next);
  }
};
export default authenticate;
