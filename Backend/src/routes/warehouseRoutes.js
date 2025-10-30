import express from "express";
import { getWarehouses,getWarehouseById,createWarehouse } from "../controllers/warehouseController.js";
const router = express.Router();

router.route("/").get(getWarehouses).post(createWarehouse);
router.route("/:id").get(getWarehouseById);

// router.get("/", (req,res)=>{
// 	res.json({message: "Warehouse API is working 🚀"})
// })

export default router;