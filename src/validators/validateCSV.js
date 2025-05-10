export function isValidRow(data) {
  const year = parseInt(data.year);
  const title = data.title?.trim();
  const studios = data.studios?.trim();
  const producers = data.producers?.trim();

  return (
    !isNaN(year) &&
    title?.length > 0 &&
    studios?.length > 0 &&
    producers?.length > 0
  );
}

export function validateHeaders(headers) {
  const expected = ["year", "title", "studios", "producers", "winner"];
  const normalized = headers.map((h) => h.trim().toLowerCase());

  const missing = expected.filter((e) => !normalized.includes(e));
  if (missing.length > 0) {
    throw new Error(`Invalid CSV header: missing ${missing.join(", ")}`);
  }
}
