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
