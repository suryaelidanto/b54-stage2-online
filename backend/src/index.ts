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
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

initializeRedisClient().then(() => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
  });

  app.use(limiter);
  app.use(cors());
  app.use(express.json());
  app.use("/api/v1", router);
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

  app.get("/", async (req: Request, res: Response) => {
    res.send("Hello welcome to circle!!!");
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
  router.get("/auth/verify-email", AuthController.verifyEmail);

  router.get("/users", authenticate, UserController.find)

  app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
  });
});
