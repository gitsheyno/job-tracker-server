import express from "express";
import morgan from "morgan";
import {
  getApplications,
  RegisterApplications,
  removeApplication,
  getUsers,
  UpdateApplication,
} from "./getApplications";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from  first middleware");
  next();
});

app.get("/", async (req, res) => {
  const ans = await getUsers();

  res.json({ data: ans });
});

app.get("/app", async (req, res) => {
  const position = req.query.position as string;
  const limit = req.query.limit as string;

  const ans = await getApplications({ limit, position });

  res.json({ data: ans });
});

app.post("/app", async (req, res) => {
  const body = req.body;

  const ans = await RegisterApplications(body);

  res.json({ data: ans });
});

app.patch("/app/:id", async (req, res) => {
  const result = await UpdateApplication(req.body);
  res.json({ data: result });
});

app.delete("/app/:id", async (req, res) => {
  const id = req.params.id;

  const result = await removeApplication(+id);
  res.json({
    message: `record ${id} is deleted`,
    data: { result },
  });
});
export default app;
