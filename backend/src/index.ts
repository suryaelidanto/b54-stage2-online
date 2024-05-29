import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";
import { MessageChannel } from "worker_threads";

const app = express();
const port = 5000;
const router = express.Router();
const routerv2 = express.Router();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v2", routerv2);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello welcome to circle!");
});

// v1
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v1!");
});

router.get("/threads", async (req: Request, res: Response) => {
  try {
    const threads = await prisma.thread.findMany();
    res.json(threads);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

type CreateThreadDTO = {
  image: string;
  content: string;
};

router.get("/threads/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const threads = await prisma.thread.findFirst({
      where: { id: Number(id) },
    });

    res.json(threads);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.post("/threads", async (req: Request, res: Response) => {
  try {
    const dto = req.body as CreateThreadDTO;

    const threads = await prisma.thread.create({
      data: { ...dto },
    });

    res.json(threads);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.patch("/threads/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dto = req.body as CreateThreadDTO;

    const thread = await prisma.thread.findFirst({
      where: { id: Number(id) },
    });

    if (!thread) return res.status(500).json({ message: "Thread not found!" });

    if (dto.content) {
      thread.content = dto.content;
    }

    if (dto.image) {
      thread.image = dto.image;
    }

    const updatedThread = await prisma.thread.update({
      where: { id: Number(id) },
      data: { ...thread },
    });

    res.json(updatedThread);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.delete("/threads/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const thread = await prisma.thread.count({
      where: { id: Number(id) },
    });

    if (!thread) return res.status(500).json({ message: "Thread not found!" });

    const deletedThread = await prisma.thread.delete({
      where: { id: Number(id) },
    });

    res.json(deletedThread);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// v2
routerv2.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v2!");
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
