import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailsModel";

export async function listTrails(req: Request, res: Response) {
  const trails = await getAllTrails();

  res.render("index.njk", { title: "Trail Guide", trails });
}

export async function showTrail(req: Request<{ slug: string }>, res: Response) {
  try {
    const { slug } = req.params;
    const trail = await getTrailBySlug(slug!);
    if (!trail) {
      res.status(400).send("Trail is not found");
      return;
    }
    res.render("trail.njk", { title: trail.title, trail });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(`Error:  ${error.message}`);
      return;
    }
    res.status(500).send("Internal Server Error");
  }
}
