import { PrismaClient } from "@prisma/client";
import { UserJWTPayload } from "../types/auth";

const prisma = new PrismaClient();

async function find(search: string) {
  try {
    return await prisma.user.findMany({
      where: {
        username: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve users");
  }
}

// async function find(user: UserJWTPayload, search: string) {
//   try {
//     const users = await prisma.user.findMany();

//     const follows = await prisma.follow.findMany({
//       where: {
//         followerId: user.id,
//       },
//     });

//     return users.map((u) => {
//       const isFollowed = follows.some((follow) => follow.followedId === u.id);
//       return { ...u, isFollowed };
//     });
//   } catch (error) {
//     throw new Error(error.message || "Failed to retrieve users");
//   }
// }

export default { find };
