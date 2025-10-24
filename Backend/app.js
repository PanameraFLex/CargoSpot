import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehouseRoutes from "./src/routes/warehouseRoutes.js";

dotenv.config()

const app = express();

//middleware
app.use(cors());
app.use(express.json());


//routes
app.use("/api/warehouses", warehouseRoutes);

export default app;