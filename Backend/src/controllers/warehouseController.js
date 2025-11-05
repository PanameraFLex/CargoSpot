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
// update existing warehouse
export const updateWarehouseById = async(req,res)=>{
	try{
		const updated = await Warehouse.findByIdAndUpdate(req.params.id, req.body,{new:true});
	if(!updated) return res.status(404).json({message:"Warehouse not found"});	
	res.json(updated)
	}catch(error){
		res.status(500).json({message:"Update failed"})
	}
};
// delete existing warehouse
export const deleteWarehouseById = async(req,res)=>{
	try{
		const deleted = await Warehouse.findByIdAndDelete(req.params.id);
		if(!deleted) return res.status(404).json({message:"Warehouse not found"});
		res.status(200).json({message:"Warehouse deleted successfully"})
	}catch(err){
		res.status(500).json({message:"Unable to delete"})
	}
};

// search warehouse 
export const searchWarehouseById = async(req,res)=>{
	const { name, manager, minCap, maxCap } = req.query;
	const query = {};
	if (name) query.name = {$regex: name, $options: "i"};
	if (manager) query.manager = {$regex: manager, $options: "i"};
	if (minCap || maxCap)
		query.capacity = {
		...(minCap && { $gte: parseInt(minCap)}),
		...(maxCap && { $lte: parseInt(maxCap)}),
	};
	try{
		const results = await Warehouse.find(query);
		res.json(results);
	} catch(err){
		console.error(err);
		res.status(500).json({ message: "Search error" });
	}
}

// controllers/warehouseController.js
export const searchWarehouseNearMe = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 10000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Coordinates required" });
    }

    const warehouses = await Warehouse.find({
      geo: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
          },
          $maxDistance: parseInt(maxDistance), // meters
        },
      },
    });

    res.json(warehouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching nearby warehouses" });
  }
};

