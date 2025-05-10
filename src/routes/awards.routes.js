import express from "express";
import { findMinAndMaxIntervals } from "../controllers/awards.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/intervals", asyncHandler(findMinAndMaxIntervals));

export default router;
