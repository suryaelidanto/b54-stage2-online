import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/auth";

const prisma = new PrismaClient();

async function find(user: UserJWTPayload) {
  try {
    const users = await prisma.user.findMany();

    const follows = await prisma.follow.findMany({
      where: {
        follower: {
          id: user.id,
        },
      },
    });

    return users.map((user) => {
      return follows.map((follow) => {
        if (user.id === follow.followedId) return { ...user, isFollowed: true };

        return { ...user, isFollowed: false };
      })[0]
    });
  } catch (error) {
    throw new String(error);
  }
}

export default { find };
