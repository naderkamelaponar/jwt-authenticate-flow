import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const unAuthorized = (next: NextFunction) => {
  const error: Error = new Error("Unauthorized user");

  next(error);
};
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    //    const authorizationHeader: string = req.headers.authorization as string;
    const authorizationHeader: string = req.headers["authorization"] as string;
    const token = req.get("authorization") as string;
    console.log(req.get("authorization"), req.headers);
    jwt.verify(token, config.tokenSecret as string);
    next();
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};
export default authenticate;
