import fs from "fs";
import csv from "csv-parser";
import db from "../config/database.js";

const splitProducers = function (producerField) {
  return producerField
    .replace(/\s+and\s+/gi, ",")
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
};

export function loadCSVData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    const insertRaw = db.prepare(`
      INSERT INTO csv_data (year, title, studios, producers, winner)
      VALUES (?, ?, ?, ?, ?)
    `);

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        const year = parseInt(data.year);
        const winner = data.winner?.toLowerCase() === "yes" ? 1 : 0;
        const producers = splitProducers(data.producers);

        producers.forEach((producer) => {
          insertRaw.run(year, data.title, data.studios, producer, winner);
          if (winner) results.push({ producer, year });
        });
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}
