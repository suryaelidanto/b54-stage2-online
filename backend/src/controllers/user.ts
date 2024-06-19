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

async function findCurrent(req: Request, res: Response) {
  try {
    const current = res.locals.user;
    const users = await UserService.findCurrent(current.id);
    return res.json({
      ...users,
      followersCount: users.followers.length,
      followingsCount: users.followeds.length
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default { find, findCurrent };
