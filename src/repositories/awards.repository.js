import db from "../config/database.js";

export function getAwardsByType(type) {
  return db
    .prepare(
      `
    SELECT producer, interval, previousWin, followingWin
    FROM awards WHERE type = ?
  `
    )
    .all(type);
}

export function insertAwardIntervals(results) {
  const insert = db.prepare(`
    INSERT INTO awards (type, producer, interval, previousWin, followingWin)
    VALUES (?, ?, ?, ?, ?)
  `);

  results.min.forEach((item) =>
    insert.run(
      "min",
      item.producer,
      item.interval,
      item.previousWin,
      item.followingWin
    )
  );

  results.max.forEach((item) =>
    insert.run(
      "max",
      item.producer,
      item.interval,
      item.previousWin,
      item.followingWin
    )
  );
}
