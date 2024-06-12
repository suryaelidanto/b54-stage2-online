import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import AuthController from "./controllers/auth";
import ThreadController from "./controllers/thread";
import UserController from "./controllers/user";
import { upload } from "./middlewares/upload-file";
import { authenticate } from "./middlewares/authenticate";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger/swagger-output.json";
import { initializeRedisClient, redisClient } from "./libs/redis";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const routerv2 = express.Router();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v2", routerv2);
app.use("/uploads", express.static("uploads"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello welcome to circle!");
});

// v1
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v1!");
});

router.get(
  "/threads",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await redisClient.get("THREADS_DATA");
    if (result) return res.json(JSON.parse(result));

    next();
  },
  ThreadController.find
);
router.get("/threads/:id", authenticate, ThreadController.findOne);
router.post(
  "/threads",
  authenticate,
  upload.single("image"),
  ThreadController.create
);
router.patch("/threads/:id", authenticate, ThreadController.update);
router.delete("/threads/:id", authenticate, ThreadController.remove);

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.post("/auth/check", authenticate, AuthController.check);

router.get("/users", authenticate, UserController.find);

// v2
routerv2.get("/", (req: Request, res: Response) => {
  res.send("Welcome to v2!");
});

initializeRedisClient().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
  });
});
