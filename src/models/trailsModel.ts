import { getDB } from "./db";
import type { Request, Response } from "express";

export type Trails = {
  id: number;
  title: string;
  slug: string;
  difficulty: string;
  distance_km: number;
  description: string;
  image_url: string;
  createdAt: number;
};

export async function getAllTrails(req: Request, res: Response): Promise<void> {
  try {
    const db = getDB();
    const trails = await db.all<Trails[]>("SELECT * FROM trails");
    console.log("Retrieved trails from database", trails);
    res.json(trails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not fetch trails");
  }
}
