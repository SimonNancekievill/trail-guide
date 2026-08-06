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

// app.get("/api/dbstructure", async (_req, res) => {
//   const db = await connectDB();
//   try {
//     const tables = await db.all(`
//       SELECT name, sql
//       FROM sqlite_master
//       WHERE type = 'table'
//       ORDER BY name;
//     `);

//     res.json(tables);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Could not read database structure");
//   }
// });
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
