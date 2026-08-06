import express from "express";
import { getAllTrails } from "../models/trailsModel";
import { getAllRegions } from "../models/regionModel";

const router = express.Router();

router.get("/trails", getAllTrails);
router.get("/regions", getAllRegions);

export default router;
