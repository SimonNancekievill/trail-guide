import { getDB } from "./db";

export type Region = {
  id: number;
  name: string;
  slug: string;
  country: string;
  description: string;
};

export async function getAllRegions(): Promise<Region[]> {
  const db = getDB();
  const regions = await db.all<Region[]>("SELECT * FROM regions");
  console.log("Retrieved trails from database", regions);
  return regions;
}

export async function getRegionBySlug(
  slug: string,
): Promise<Region | undefined> {
  const db = getDB();
  const region = await db.get<Region>(
    "SELECT * FROM regions WHERE slug = ?",
    slug,
  );

  return region;
}
