import { Request, Response } from "express";
import UserService from "../services/user";

async function find(req: Request, res: Response) {
  try {
    const search = req.query.search as string;
    const users = await UserService.find(search);
    return res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default { find };
