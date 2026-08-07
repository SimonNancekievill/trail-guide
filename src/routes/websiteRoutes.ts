import { Router } from "express";
import { listTrails, showTrail } from "../controllers/trailController";
import { listRegions } from "../controllers/regionController";

const router = Router();

router.get("/", listTrails);
router.get("/trails/:slug", showTrail);
router.get("/regions", listRegions);

export default router;
