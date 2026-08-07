import { Router } from "express";
import { listTrails } from "../controllers/trailController";

const router = Router();

router.get("/", listTrails);

export default router;
