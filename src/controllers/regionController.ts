import type { Request, Response } from "express";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getTrailsByRegionId } from "../models/trailsModel";

export async function listRegions(req: Request, res: Response) {
  const regions = await getAllRegions();

  res.render("regions.njk", { title: "Regions", regions });
}

export async function showRegion(
  req: Request<{ slug: string }>,
  res: Response,
) {
  try {
    const { slug } = req.params;
    const region = await getRegionBySlug(slug!);

    if (!region) {
      res.status(404).send("Region not found");
      return;
    }
    const trails = await getTrailsByRegionId(region.id);
    res.render("region.njk", { title: region.name, region, trails });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(`Error:  ${error.message}`);
      return;
    }
    res.status(500).send("Internal Server Error");
  }
}
