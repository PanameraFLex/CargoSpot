import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema(
	{
		productName:{
			type: String,
			required:[true, "Product name is required"]
		},
		category:{
			type: String,
			required:[true, "Product category is required"]
		},
		quantity:{
			type:Number,
			default:0
		},
		units:{
			type:String,
			default:"units"
		}
},
{_id:false});

const warehouseSchema = new mongoose.Schema(
	{
		name:{
			type:String,
			required:[true,"Specify name of Warehouse"]
		},
		location:{
			type:String,
			required:[true,"Specify Warehouse location"]
		},
		coordinates:{
			lat:{type:Number,required:true},
			lng:{type:Number, required:true}
		},
		capacity:{
			type:Number,
			default:0
		},
		availableSpace:{
			type:Number,
			default:0
		},
		manager:{
			type:String,
			default:"Not Assigned"
		},
		inventory: [inventorySchema]
	},
	{timestamps:true}
);
const Warehouse = mongoose.model("Warehouse", warehouseSchema)

export default Warehouse;