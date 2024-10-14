import express from "express";
import morgan from "morgan";
import {
  getApplications,
  RegisterApplications,
  removeApplication,
  getUsers,
  UpdateApplication,
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
  console.log(req.query, "query");
  const ans = await getApplications(req.query);

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

app.patch("/app/:id", async (req, res) => {
  console.log("id", req.params.id);
  const result = await UpdateApplication(req.body);
  console.log(result, "res");
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
