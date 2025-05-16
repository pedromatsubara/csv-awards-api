import fs from "fs";
import csv from "csv-parser";
import db from "../config/database.js";
import { isValidRow, validateHeaders } from "../validators/validateCSV.js";
import { splitProducers } from "../utils/awardDataUtils.js";

export function loadCSVData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    const insertRaw = db.prepare(`
      INSERT INTO csv_data (year, title, studios, producers, winner)
      VALUES (?, ?, ?, ?, ?)
    `);

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      .on("headers", (headers) => {
        try {
          validateHeaders(headers);
        } catch (err) {
          reject(err);
        }
      })
      .on("data", (data) => {
        if (!isValidRow(data)) return;

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
