import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 65535;

app.use(cors());

app.get("/home", (req: Request, res: Response) => {
  res.json([
    {
      title: "halo",
      description: "description",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
