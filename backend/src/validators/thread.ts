import joi from "joi";
import { CreateThreadDTO } from "../dto/thread-dto";

export const createThreadSchema = joi.object<CreateThreadDTO>({
  image: joi.string(),
  content: joi.string().min(1).max(255).required(),
});
