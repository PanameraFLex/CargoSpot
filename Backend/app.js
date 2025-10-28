import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import warehouseRoutes from "./src/routes/warehouseRoutes.js";



const app = express();
dotenv.config()

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
	res.send("Server root working")
})


//routes
app.use("/api/warehouses", warehouseRoutes);

export default app;