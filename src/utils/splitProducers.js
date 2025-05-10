export function splitProducers(producerField) {
  return producerField
    .replace(/\s+and\s+/gi, ',')
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
