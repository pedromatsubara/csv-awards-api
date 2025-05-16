import request from "supertest";
import app from "../app.js";
import { loadCSVData } from "../loaders/csvLoader.js";
import { calculateIntervals } from "../services/awards.service.js";
import { describe, it, expect } from "vitest";
import { resetDatabase } from "../database/schema.js";
import { insertAwardIntervals } from "../repositories/awards.repository.js";

async function loadCSV(filePath) {
  resetDatabase();
  const data = await loadCSVData(filePath);
  const results = calculateIntervals(data);
  insertAwardIntervals(results);
}

describe("GET /awards/intervals", () => {
  it("should return min and max data with expected values", async () => {
    await loadCSV("src/__tests__/data/data.csv");
    const response = await request(app).get("/awards/intervals");

    expect(response.statusCode).toBe(200);

    const expected = {
      min: [
        {
          producer: "Allan Carr",
          interval: 0,
          previousWin: 1980,
          followingWin: 1980,
        },
        {
          producer: "Joel Silver",
          interval: 0,
          previousWin: 1994,
          followingWin: 1994,
        },
      ],
      max: [
        {
          producer: "Susan Levin",
          interval: 25,
          previousWin: 1980,
          followingWin: 2005,
        },
      ],
    };

    expect(response.body).toEqual(expected);
  });

  it("should return empty lists if the CSV is empty", async () => {
    await loadCSV("src/__tests__/data/data-empty.csv");
    const response = await request(app).get("/awards/intervals");

    expect(response.body.min).toEqual([]);
    expect(response.body.max).toEqual([]);
  });

  it("should trigger the error middleware with an invalid CSV", async () => {
    try {
      await loadCSVData("src/__tests__/data/data-invalid-header.csv");
      await request(app).get("/awards/intervals");
      throw new Error("Expected error, but none occurred");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/missing winner/);
    }
  });

  it("should ignore invalid records (missing year or producer)", async () => {
    await loadCSV("src/__tests__/data/data-invalid-register.csv");
    const response = await request(app).get("/awards/intervals");

    expect(response.body.min).toEqual([]);
    expect(response.body.max).toEqual([]);
  });

  it("should return empty if no producer has more than one win", async () => {
    await loadCSV("src/__tests__/data/data-no-duplicates.csv");
    const response = await request(app).get("/awards/intervals");

    expect(response.body.min).toEqual([]);
    expect(response.body.max).toEqual([]);
  });
});
