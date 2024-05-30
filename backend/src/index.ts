import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import AuthController from "./controllers/auth";
import ThreadController from "./controllers/thread";
import { upload } from "./middlewares/upload-file";
dotenv.config();

const app = express();
const port = 5000;
const router = express.Router();
const routerv2 = express.Router();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v2", routerv2);
app.use("/uploads", express.static("uploads"))

app.get("/", (req: Request, res: Response) => {
  res.send("Hello welcome to circle!");
});

// v1
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v1!");
});

router.get("/threads", ThreadController.find);
router.get("/threads/:id", ThreadController.findOne);
router.post("/threads", upload.single("image"),  ThreadController.create);
router.patch("/threads/:id", ThreadController.update);
router.delete("/threads/:id", ThreadController.remove);

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

// v2
routerv2.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v2!");
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
