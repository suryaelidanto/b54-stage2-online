import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";
import ThreadController from "./controllers/thread";

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

router.get("/threads", ThreadController.find);

router.get("/threads/:id", ThreadController.findOne);

router.post("/threads", ThreadController.create);

router.patch("/threads/:id", ThreadController.update);

router.delete("/threads/:id", ThreadController.remove);

// v2
routerv2.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v2!");
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
