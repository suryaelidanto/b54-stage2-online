import { Request, Response } from "express";
import AuthService from "../services/auth";

async function login(req: Request, res: Response) {
  try {
    const user = await AuthService.login(req.body);
    res.json(user);
  } catch (error) {
    res.status(error.message === "User not found" ? 404 : 500).json({
      message: error.message,
    });
  }
}

async function register(req: Request, res: Response) {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default { login, register };
