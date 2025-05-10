import { findMinAndMaxAwardIntervals } from "../services/awards.service.js";

export async function findMinAndMaxIntervals(req, res, next) {
  try {
    const result = findMinAndMaxAwardIntervals();
    res.json(result);
  } catch (err) {
    next(err);
  }
}
