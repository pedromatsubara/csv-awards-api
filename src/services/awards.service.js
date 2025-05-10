import { getAwardsByType } from "../repositories/awards.repository.js";

export function findMinAndMaxAwardIntervals() {
  const min = getAwardsByType("min");
  const max = getAwardsByType("max");
  return { min, max };
}

export function calculateIntervals(data) {
  const winsByProducer = new Map();
  const min = [];
  const max = [];

  for (const { producer, year } of data) {
    if (!winsByProducer.has(producer)) {
      winsByProducer.set(producer, []);
    }
    winsByProducer.get(producer).push(year);
  }

  for (const [producer, years] of winsByProducer.entries()) {
    if (years.length < 2) continue;

    const sortedYears = [...years].sort((a, b) => a - b);
    const intervals = [];

    for (let i = 1; i < sortedYears.length; i++) {
      intervals.push({
        interval: sortedYears[i] - sortedYears[i - 1],
        previousWin: sortedYears[i - 1],
        followingWin: sortedYears[i],
      });
    }

    const minInterval = intervals.reduce((a, b) =>
      a.interval < b.interval ? a : b
    );
    const maxInterval = intervals.reduce((a, b) =>
      a.interval > b.interval ? a : b
    );

    min.push({ producer, ...minInterval });
    max.push({ producer, ...maxInterval });
  }

  return { min, max };
}
