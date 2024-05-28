import cors from "cors";
import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Thread } from "./entities/Thread";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;
    const router = express.Router();
    const routerv2 = express.Router();

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);
    app.use("/api/v2", routerv2);

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello welcome to circle!");
    });

    const threadRepository = AppDataSource.getRepository(Thread);

    // v1
    router.get("/", (req: Request, res: Response) => {
      res.send("Welcome to v1!");
    });

    router.get("/threads", async (req: Request, res: Response) => {
      const threads = await threadRepository.find();
      res.json(threads);
    });

    router.get("/threads/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      const threads = await threadRepository.findOne({
        where: { id: Number(id) },
      });
      res.json(threads);
    });

    // v2
    routerv2.get("/", (req: Request, res: Response) => {
      res.send("Welcome to v2!");
    });

    app.listen(port, () => {
      console.log(`Server berjalan di port ${port}`);
    });
  })
  .catch((error) => console.log(error));
