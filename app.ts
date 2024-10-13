import express from "express";
import morgan from "morgan";
import {
  getApplications,
  RegisterApplications,
  getUsers,
} from "./getApplications";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from  first middleware");
  next();
});

app.get("/", async (req, res) => {
  const ans = await getUsers();

  console.log(ans, "res");
  res.json({ data: ans });
});

app.get("/app", async (req, res) => {
  const ans = await getApplications();

  console.log(ans, "res");
  res.json({ data: ans });
});

app.post("/app", async (req, res) => {
  const body = req.body;

  console.log("body", body);
  const ans = await RegisterApplications(body);

  console.log(ans, "res");
  res.json({ data: ans });
});
export default app;
