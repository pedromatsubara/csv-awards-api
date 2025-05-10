import { loadCSVData } from "./csvLoader.js";
import { calculateIntervals } from "../services/awards.service.js";
import { insertAwardIntervals } from "../repositories/awards.repository.js";

export async function preloadAwardsData(path) {
  try {
    const data = await loadCSVData(path);
    const results = calculateIntervals(data);
    insertAwardIntervals(results);
    console.log("Awards data loaded successfully!");
  } catch (err) {
    console.error("Failed to load CSV data:", err);
  }
}
