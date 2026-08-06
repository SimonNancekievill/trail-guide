import express from "express";
import nunjucks from "nunjucks";
import { connectDB, closeDB } from "./models/db";
import router from "./routes/APIRoutes";

const app = express();
const port = process.env.PORT;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

app.use("/api", router);

try {
  await connectDB();
  console.log("Database successfully connected");
} catch (error) {
  console.error("Failed to connect to database", error);
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server is runnung at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
