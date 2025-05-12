import db from "../config/database.js";

export function resetDatabase() {
  db.prepare("DROP TABLE IF EXISTS csv_data").run();
  db.prepare("DROP TABLE IF EXISTS awards").run();

  db.prepare(
    `
    CREATE TABLE csv_data (
      year INTEGER,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner BOOLEAN
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE awards (
      type TEXT,
      producer TEXT,
      interval INTEGER,
      previousWin INTEGER,
      followingWin INTEGER
    )
  `
  ).run();
}
