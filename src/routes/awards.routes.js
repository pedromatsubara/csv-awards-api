import express from "express";
import { findMinAndMaxIntervals } from "../controllers/awards.controller.js";

const router = express.Router();

router.get("/intervals", findMinAndMaxIntervals);

export default router;
