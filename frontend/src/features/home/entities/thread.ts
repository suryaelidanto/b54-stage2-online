import { UserEntity } from "./user";

export type ThreadEntity = {
  id: number;
  content: string;
  image: string;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};
