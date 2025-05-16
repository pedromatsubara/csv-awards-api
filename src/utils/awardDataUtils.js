export function splitProducers(producerField) {
  return producerField
    .replace(/\s+and\s+/gi, ",")
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export function groupWinsByProducer(data) {
  const map = new Map();
  for (const { producer, year } of data) {
    if (!map.has(producer)) {
      map.set(producer, []);
    }
    map.get(producer).push(year);
  }
  return map;
}

export function collectAllIntervals(winsByProducer) {
  const intervals = [];
  for (const [producer, years] of winsByProducer.entries()) {
    if (years.length < 2) continue;

    const sorted = years.slice().sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++) {
      intervals.push({
        producer,
        interval: sorted[i] - sorted[i - 1],
        previousWin: sorted[i - 1],
        followingWin: sorted[i],
      });
    }
  }
  return intervals;
}
