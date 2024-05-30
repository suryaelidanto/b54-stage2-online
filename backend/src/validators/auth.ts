import joi from "joi";
import { LoginDTO, RegisterDTO } from "../dto/auth-dto";

export const loginSchema = joi.object<LoginDTO>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const registerSchema = joi.object<RegisterDTO>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  fullName: joi.string(),
  username: joi.string().required().min(3).max(20),
});
