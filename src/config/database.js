import Database from "better-sqlite3";

const db = new Database(":memory:");

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

export default db;
