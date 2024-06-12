import { NextFunction, Request, Response } from "express";
import { redisClient } from "../libs/redis";

export async function redisMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return async function (redisKey: string) {
    const result = await redisClient.get(redisKey);
    if (result) return res.json(JSON.parse(result));

    next();
  };
}

export const redisCheck = redisMiddleware
