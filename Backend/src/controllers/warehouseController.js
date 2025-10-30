import Warehouse from "../models/warehouseModel.js";

// get all warehouses
export const getWarehouses = async(req,res)=>{
	try{
		const warehouses = await Warehouse.find({});
		res.status(200).json(warehouses);
	}catch(error){
		res.status(500).json({message:"Server error fetching warehouses"})
	}
};
// get warehouse by id api/warehouses/:id
export const getWarehouseById = async (req,res)=>{
	try{
		const warehouse = await Warehouse.findById(req.params.id);
		if(!warehouse) return res.status(400).json({message:"Warehouse not found"})
			res.status(200).json(warehouse)
	}catch(error){
		res.status(500).json({message: "Server error fetching warehouse"})
	}
}
//create new warehouse
export const createWarehouse = async(req,res)=>{
	try{
		const newWarehouse = await Warehouse.create(req.body);
		res.status(201).json(newWarehouse)
	}catch(error){
		res.status(400).json({message:"Invalid data"})
	}
};
