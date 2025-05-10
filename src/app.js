import express from "express";
import awardsRoutes from "./routes/awards.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/awards", awardsRoutes);

app.use(errorHandler);

export default app;
