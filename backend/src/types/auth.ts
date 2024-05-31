export type UserJWTPayload = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  photoProfile: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};
