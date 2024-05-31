import { Request, Response } from "express";
import UserService from "../services/user";

async function find(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const users = await UserService.find(user);
    return res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

export default { find };
