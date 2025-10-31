import express from "express";
import { getWarehouses,getWarehouseById,createWarehouse,updateWarehouseById, deleteWarehouseById, searchWarehouseById} from "../controllers/warehouseController.js";
const router = express.Router();

router.route("/").get(getWarehouses).post(createWarehouse);
router.route("/:id").get(getWarehouseById).put(updateWarehouseById);
router.route("/:id").get(getWarehouseById).delete(deleteWarehouseById);
router.route("/search").get(searchWarehouseById);
//update existing warehouse
// router.put("/:id", async (req, res)=>{
// 	try{
// 		const updated = await Warehouse.findByIdAndUpdate(req.params.id, params.body,{new:true});
// 	if(!updated) return res.status(404).json({message:"Warehouse not found"})
// 	res.json(updated)
// 	}catch(err){
// 		console.error(err)
// 		res.status(500).json({message:"Update failed"})
// 	}
// })

//delete existing warehouse by ID
router.delete("/:id", async(req, res)=>{
	try{
		const deleted = await Warehouse.findByIdAndDelete(req.params.id);
		if(!deleted)return
			res.status(404).json({message:"Warehouse not found"})
		res.json({message:"Warehouse deleted"})
		}catch(err){
		res.status(500).json({message:"Unable to delete"})
	}
})

// router.get("/", (req,res)=>{
// 	res.json({message: "Warehouse API is working 🚀"})
// })

export default router;