import type { Request, Response } from "express";
import { getAllTrails } from "../models/trailsModel";

export async function listTrails(req: Request, res: Response) {
  const trails = await getAllTrails();

  res.render("index.njk", { title: "Trail Guide", trails });
}
