import express from "express";
import awardsRoutes from "./routes/awards.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { preloadAwardsData } from "./loaders/loadAwards.js";

await preloadAwardsData("src/data/data.csv");
// await preloadAwardsData("src/__tests__/data/data.csv");
const app = express();

app.use(express.json());
app.use("/awards", awardsRoutes);

app.use(errorHandler);

export default app;
