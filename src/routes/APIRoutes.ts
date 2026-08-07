import express from "express";
import { getAllTrails } from "../models/trailsModel";
import { getAllRegions } from "../models/regionModel";

const APIRouter = express.Router();

APIRouter.get("/trails", getAllTrails);
APIRouter.get("/regions", getAllRegions);

export default APIRouter;
