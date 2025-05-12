# CSV Awards API

This is a RESTful Node.js API built with **Express** that loads a CSV file on startup, processes producer award data, and provides an endpoint to retrieve the minimum and maximum intervals between awards.

## Features

- Parses a CSV file containing award data on server initialization
- Saves data to an **in-memory SQLite database** (`better-sqlite3`)
- Calculates **min and max intervals** between producer wins
- Exposes a single REST endpoint:
  - `GET /awards/intervals` returns `{ min: [...], max: [...] }`
- Includes full integration test coverage using **Vitest + Supertest**

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/pedromatsubara/csv-awards-api.git
cd csv-awards-api
npm install
```

### Start the server

```bash
npm start
```

Server will run at `http://localhost:3000`

---

## Endpoint

### GET /awards/intervals

Returns the producers with the minimum and maximum interval between awards.

#### Response format:

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2000,
      "followingWin": 2001
    },
    {
      "producer": "Producer 2",
      "interval": 2,
      "previousWin": 1978,
      "followingWin": 1980
    }
  ],
  "max": [
    {
      "producer": "Producer 1",
      "interval": 4,
      "previousWin": 2001,
      "followingWin": 2005
    },
    {
      "producer": "Producer 2",
      "interval": 30,
      "previousWin": 1980,
      "followingWin": 2010
    }
  ]
}
```

---

## Running Tests

This project uses **Vitest** and **Supertest** for integration testing.

### Run all tests:

```bash
npm test
```

Test cases cover:

- Valid CSV with expected results  
- Edge cases (empty, malformed, invalid headers)  
- System behavior (missing CSV, reprocessing, DB reset)

---

## Sample CSV Format

```
year;title;studios;producers;winner
1980;Movie A;Studio A;Producer One;yes
1985;Movie B;Studio B;Producer One;yes
1990;Movie C;Studio C;Producer Two;yes
```

- `winner` should be `"yes"` (case-insensitive)  
- Multiple producers can be split by commas or "and"

---

## Requirements

- Node.js >= 18  
- npm >= 9
