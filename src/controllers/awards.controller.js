import { findMinAndMaxAwardIntervals } from "../services/awards.service.js";

export async function findMinAndMaxIntervals(req, res) {
  try {
    const result = findMinAndMaxAwardIntervals();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
