import type { NextFunction, Request, Response } from "express";
import { appendFile } from "node:fs/promises";
import * as path from "node:path";

const LOG_DIR = path.join(import.meta.dirname, "..", "..", "logs");
const LOG_FILE = path.join(LOG_DIR, "access.log");

export function logger(req: Request, res: Response, next: NextFunction) {
  try {
    res.on("finish", () => {
      const logEntry =
        [
          new Date().toISOString(),
          req.method,
          req.originalUrl,
          res.statusCode,
        ].join(" ") + "\n";
      appendFile(LOG_FILE, logEntry, { encoding: "utf-8" });
    });
    next();
  } catch (error) {
    console.error(error);
  }
}
