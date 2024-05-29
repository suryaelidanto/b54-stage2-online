import { PrismaClient } from "@prisma/client";
import { UpdateThreadDTO, CreateThreadDTO } from "../dto/thread-dto";

const prisma = new PrismaClient();

async function find() {
  try {
    return await prisma.thread.findMany();
  } catch (error) {
    return error;
  }
}

async function findOne(id: number) {
  try {
    const thread = await prisma.thread.findFirst({
      where: { id },
    });

    if (!thread) return null;

    return thread;
  } catch (error) {
    return error;
  }
}

async function create(dto: CreateThreadDTO) {
  try {
    // validasi menggunakan JOI

    return await prisma.thread.create({
      data: { ...dto },
    });
  } catch (error) {
    return error;
  }
}

async function update(id: number, dto: UpdateThreadDTO) {
  try {
    const thread = await prisma.thread.findFirst({
      where: { id: Number(id) },
    });

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
    return error;
  }
}

async function remove(id: number) {
  try {
    return await prisma.thread.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    return error;
  }
}

export default { find, findOne, create, update, remove };
