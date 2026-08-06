import { getDB } from "./db";

export type Trail = {
  id: number;
  title: string;
  slug: string;
  difficulty: string;
  distance_km: number;
  description: string;
  image_url: string;
  region_id: number;
  createdAt: number;
};
export type TrailWithRegion = Trail & {
  region_name: string;
  region_country: string;
};

export async function getAllTrails(): Promise<TrailWithRegion[]> {
  const db = getDB();
  const trails = await db.all<TrailWithRegion[]>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id",
  );
  return trails;
}

export async function getTrailBySlug(
  slug: string,
): Promise<TrailWithRegion | undefined> {
  const db = getDB();
  const trail = await db.get<TrailWithRegion>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id WHERE slug = ?",
    slug,
  );

  return trail;
}

export async function getTrailsByRegionId(
  regionId: number,
): Promise<TrailWithRegion[]> {
  const db = getDB();
  const trailWithRegionId = await db.all<TrailWithRegion[]>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id WHERE trails.region_id = ?",
    regionId,
  );

  return trailWithRegionId;
}
