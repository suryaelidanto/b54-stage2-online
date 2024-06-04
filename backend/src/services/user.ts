import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/auth";

const prisma = new PrismaClient();

async function find(user: UserJWTPayload) {
  try {
    const users = await prisma.user.findMany();

    const follows = await prisma.follow.findMany({
      where: {
        followerId: user.id,
      },
    });

    return users.map((u) => {
      const isFollowed = follows.some((follow) => follow.followedId === u.id);
      return { ...u, isFollowed };
    });
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve users");
  }
}

export default { find };
