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
		location: { type: String, required: true },
			geo: {
				type: {
					type: String,
					enum: ["Point"],
					default: "Point",
				},
				coordinates: {
					type: [Number],
					required: true,
				},
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
// Enable geospatial queries
warehouseSchema.index({ geo: "2dsphere" });
const Warehouse = mongoose.model("Warehouse", warehouseSchema)

export default Warehouse;