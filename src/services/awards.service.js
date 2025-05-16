import { getAwardsByType } from "../repositories/awards.repository.js";
import {
  collectAllIntervals,
  groupWinsByProducer,
} from "../utils/awardDataUtils.js";

export function findMinAndMaxAwardIntervals() {
  const min = getAwardsByType("min");
  const max = getAwardsByType("max");
  return { min, max };
}

export function calculateIntervals(data) {
  const winsByProducer = groupWinsByProducer(data);
  const allIntervals = collectAllIntervals(winsByProducer);

  const minIntervalValue = Math.min(...allIntervals.map((e) => e.interval));
  const maxIntervalValue = Math.max(...allIntervals.map((e) => e.interval));

  return {
    min: allIntervals.filter((e) => e.interval === minIntervalValue),
    max: allIntervals.filter((e) => e.interval === maxIntervalValue),
  };
}
