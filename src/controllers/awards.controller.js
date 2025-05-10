import { findMinAndMaxAwardIntervals } from "../services/awards.service.js";

export async function findMinAndMaxIntervals(req, res) {
  const result = findMinAndMaxAwardIntervals();
  res.json(result);
}
