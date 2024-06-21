import { PrismaClient } from "@prisma/client";
import { UpdateThreadDTO, CreateThreadDTO } from "../dto/thread-dto";
import { createThreadSchema } from "../validators/thread";
import { v2 as cloudinary } from "cloudinary";
import { omitProperties } from "../utils/omitProperties";

const prisma = new PrismaClient();

/**
 *  @param userId - The currently signed in user id (optional).
 */
async function find(userId?: number) {
  try {
    const threads = await prisma.thread.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            photoProfile: true,
          },
        },
        likes: {
          take: 1,
          where: { userId: userId || -1 },
          select: { userId: true },
        },
      },
    });

    return threads.map((thread) => ({
      ...omitProperties(thread, ["likes"]),
      isLiked: thread.likes?.[0]?.userId ? true : false,
    }));
  } catch (error) {
    throw new Error("Failed to retrieve threads");
  }
}

/**
 * @param id id of the thread
 * @param userId - The currently signed in user id (optional).
 */
async function findOne(id: number, userId?: number) {
  try {
    const thread = await prisma.thread.findFirst({
      where: { id },
      include: {
        likes: {
          take: 1,
          where: { userId: userId || -1 },
          select: { userId: true },
        },
      },
    });

    if (!thread) throw new Error("Thread not found");

    return {
      ...omitProperties(thread, ["likes"]),
      isLiked: thread.likes?.[0]?.userId ? true : false,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve thread");
  }
}

async function create(dto: CreateThreadDTO, userId: number) {
  try {
    const validate = createThreadSchema.validate(dto);

    if (validate.error) {
      throw new Error(validate.error.message);
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const upload = await cloudinary.uploader.upload(dto.image, {
      upload_preset: "b54circle",
    });

    return await prisma.thread.create({
      data: { ...dto, userId, image: upload.secure_url },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to create thread");
  }
}

async function update(id: number, dto: UpdateThreadDTO) {
  try {
    const thread = await prisma.thread.findFirst({
      where: { id: Number(id) },
    });

    if (!thread) throw new Error("Thread not found");

    if (dto.content) {
      thread.content = dto.content;
    }

    if (dto.image) {
      thread.image = dto.image;
    }

    return await prisma.thread.update({
      where: { id: Number(id) },
      data: { ...thread },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to update thread");
  }
}

async function remove(id: number) {
  try {
    return await prisma.thread.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to delete thread");
  }
}

export default { find, findOne, create, update, remove };
