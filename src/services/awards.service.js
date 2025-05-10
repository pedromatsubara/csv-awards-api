import { getAwardsByType } from "../repositories/awards.repository.js";

export function findMinAndMaxAwardIntervals() {
  const min = getAwardsByType("min");
  const max = getAwardsByType("max");
  return { min, max };
}
