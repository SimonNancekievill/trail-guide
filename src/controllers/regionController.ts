import type { Request, Response } from "express";
import { getAllRegions } from "../models/regionModel";

export async function listRegions(req: Request, res: Response) {
  const regions = await getAllRegions();

  res.render("regions.njk", { title: "Regions", regions });
}
