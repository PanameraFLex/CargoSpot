import mongoose from "mongoose";
import dotenv from "dotenv";
import Warehouse from "../models/warehouseModel.js";
import connectDB from "../config/db.js";

dotenv.config();

const warehouses = [
  {
    name: "London Gateway Distribution Hub",
    location: "London, England",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    capacity: 12000,
    availableSpace: 2800,
    manager: "Sarah Johnson",
    inventory: [
      { productName: "Consumer Electronics", category: "Electronics", quantity: 1200, unit: "pcs" },
      { productName: "Mobile Accessories", category: "Electronics", quantity: 3400, unit: "pcs" },
      { productName: "Packaging Materials", category: "Logistics Supplies", quantity: 1500, unit: "boxes" },
    ],
  },
  {
    name: "Manchester Central Logistics Park",
    location: "Manchester, England",
    coordinates: { lat: 53.4808, lng: -2.2426 },
    capacity: 9500,
    availableSpace: 1800,
    manager: "David Clarke",
    inventory: [
      { productName: "Automotive Parts", category: "Automotive", quantity: 2400, unit: "units" },
      { productName: "Lubricants", category: "Automotive", quantity: 1200, unit: "litres" },
      { productName: "Tyres", category: "Automotive", quantity: 1500, unit: "pcs" },
    ],
  },
  {
    name: "Birmingham Freight Terminal",
    location: "Birmingham, England",
    coordinates: { lat: 52.4862, lng: -1.8904 },
    capacity: 11000,
    availableSpace: 2500,
    manager: "Emma Richardson",
    inventory: [
      { productName: "Vehicle Engines", category: "Automotive", quantity: 500, unit: "units" },
      { productName: "Metal Components", category: "Manufacturing", quantity: 2400, unit: "pcs" },
      { productName: "Batteries", category: "Industrial", quantity: 1000, unit: "pcs" },
    ],
  },
  {
    name: "Leeds Regional Distribution Centre",
    location: "Leeds, England",
    coordinates: { lat: 53.8008, lng: -1.5491 },
    capacity: 8700,
    availableSpace: 1300,
    manager: "Tom Mitchell",
    inventory: [
      { productName: "Textiles", category: "Apparel", quantity: 1800, unit: "rolls" },
      { productName: "Footwear", category: "Retail", quantity: 2200, unit: "pairs" },
      { productName: "Packaging Boxes", category: "Logistics Supplies", quantity: 600, unit: "boxes" },
    ],
  },
  {
    name: "Liverpool Maritime Logistics Hub",
    location: "Liverpool, England",
    coordinates: { lat: 53.4084, lng: -2.9916 },
    capacity: 10200,
    availableSpace: 3100,
    manager: "Rebecca Moore",
    inventory: [
      { productName: "Frozen Foods", category: "Food & Beverage", quantity: 4000, unit: "kg" },
      { productName: "Seafood", category: "Food & Beverage", quantity: 2500, unit: "kg" },
      { productName: "Dry Goods", category: "Food & Beverage", quantity: 3000, unit: "kg" },
    ],
  },
  {
    name: "Glasgow Northern Freight Hub",
    location: "Glasgow, Scotland",
    coordinates: { lat: 55.8642, lng: -4.2518 },
    capacity: 9000,
    availableSpace: 2000,
    manager: "James Wallace",
    inventory: [
      { productName: "Timber", category: "Construction", quantity: 1200, unit: "tons" },
      { productName: "Building Materials", category: "Construction", quantity: 1800, unit: "tons" },
      { productName: "Tools & Equipment", category: "Industrial", quantity: 900, unit: "pcs" },
    ],
  },
  {
    name: "Edinburgh Storage & Distribution",
    location: "Edinburgh, Scotland",
    coordinates: { lat: 55.9533, lng: -3.1883 },
    capacity: 8500,
    availableSpace: 1700,
    manager: "Hannah McDonald",
    inventory: [
      { productName: "Pharmaceutical Supplies", category: "Healthcare", quantity: 1200, unit: "boxes" },
      { productName: "Medical Equipment", category: "Healthcare", quantity: 800, unit: "pcs" },
      { productName: "Protective Gear", category: "Healthcare", quantity: 2300, unit: "pcs" },
    ],
  },
  {
    name: "Bristol South West Freight Terminal",
    location: "Bristol, England",
    coordinates: { lat: 51.4545, lng: -2.5879 },
    capacity: 9600,
    availableSpace: 2000,
    manager: "Liam Turner",
    inventory: [
      { productName: "Beverages", category: "Food & Beverage", quantity: 3200, unit: "litres" },
      { productName: "Packaging Materials", category: "Logistics Supplies", quantity: 1200, unit: "boxes" },
      { productName: "Glass Bottles", category: "Manufacturing", quantity: 5000, unit: "pcs" },
    ],
  },
  {
    name: "Sheffield Industrial Storage Facility",
    location: "Sheffield, England",
    coordinates: { lat: 53.3811, lng: -1.4701 },
    capacity: 7800,
    availableSpace: 1500,
    manager: "Charlotte Evans",
    inventory: [
      { productName: "Steel Sheets", category: "Manufacturing", quantity: 2500, unit: "tons" },
      { productName: "Metal Bars", category: "Manufacturing", quantity: 1500, unit: "tons" },
      { productName: "Industrial Equipment", category: "Industrial", quantity: 700, unit: "pcs" },
    ],
  },
  {
    name: "Nottingham Midlands Distribution Park",
    location: "Nottingham, England",
    coordinates: { lat: 52.9548, lng: -1.1581 },
    capacity: 8800,
    availableSpace: 2200,
    manager: "Daniel Brooks",
    inventory: [
      { productName: "Pharmaceuticals", category: "Healthcare", quantity: 1000, unit: "boxes" },
      { productName: "Cosmetics", category: "Retail", quantity: 1500, unit: "pcs" },
      { productName: "Medical Devices", category: "Healthcare", quantity: 500, unit: "pcs" },
    ],
  },
  {
    name: "Newcastle North Logistics Centre",
    location: "Newcastle upon Tyne, England",
    coordinates: { lat: 54.9784, lng: -1.6174 },
    capacity: 9100,
    availableSpace: 1900,
    manager: "Ella Thompson",
    inventory: [
      { productName: "Frozen Goods", category: "Food & Beverage", quantity: 2500, unit: "kg" },
      { productName: "Bottled Water", category: "Food & Beverage", quantity: 5000, unit: "litres" },
      { productName: "Confectionery", category: "Retail", quantity: 3000, unit: "pcs" },
    ],
  },
  {
    name: "Leicester Cargo and Storage Hub",
    location: "Leicester, England",
    coordinates: { lat: 52.6369, lng: -1.1398 },
    capacity: 8200,
    availableSpace: 1600,
    manager: "Oliver Bennett",
    inventory: [
      { productName: "Furniture Sets", category: "Home Goods", quantity: 300, unit: "sets" },
      { productName: "Mattresses", category: "Home Goods", quantity: 400, unit: "pcs" },
      { productName: "Cushions", category: "Home Goods", quantity: 1000, unit: "pcs" },
    ],
  },
  {
    name: "Coventry Central Logistics Park",
    location: "Coventry, England",
    coordinates: { lat: 52.4068, lng: -1.5197 },
    capacity: 8900,
    availableSpace: 2000,
    manager: "Sophie Adams",
    inventory: [
      { productName: "Machinery Parts", category: "Industrial", quantity: 1800, unit: "pcs" },
      { productName: "Packaging Rolls", category: "Logistics Supplies", quantity: 2200, unit: "rolls" },
      { productName: "Lubricants", category: "Industrial", quantity: 1500, unit: "litres" },
    ],
  },
  {
    name: "Southampton Port Storage Facility",
    location: "Southampton, England",
    coordinates: { lat: 50.9097, lng: -1.4043 },
    capacity: 10000,
    availableSpace: 2400,
    manager: "George Allen",
    inventory: [
      { productName: "Marine Equipment", category: "Maritime", quantity: 400, unit: "pcs" },
      { productName: "Cargo Containers", category: "Maritime", quantity: 600, unit: "units" },
      { productName: "Fuel Drums", category: "Industrial", quantity: 800, unit: "drums" },
    ],
  },
  {
    name: "Portsmouth Maritime Distribution Centre",
    location: "Portsmouth, England",
    coordinates: { lat: 50.8198, lng: -1.088 },
    capacity: 9400,
    availableSpace: 2100,
    manager: "Amelia Wright",
    inventory: [
      { productName: "Ship Supplies", category: "Maritime", quantity: 700, unit: "crates" },
      { productName: "Machinery Parts", category: "Industrial", quantity: 1000, unit: "pcs" },
      { productName: "Bulk Grain", category: "Food & Beverage", quantity: 5000, unit: "kg" },
    ],
  },
  {
    name: "Oxford Logistics & Storage Hub",
    location: "Oxford, England",
    coordinates: { lat: 51.752, lng: -1.2577 },
    capacity: 7700,
    availableSpace: 1200,
    manager: "Benjamin Scott",
    inventory: [
      { productName: "Pharmaceutical Supplies", category: "Healthcare", quantity: 1200, unit: "boxes" },
      { productName: "Lab Equipment", category: "Healthcare", quantity: 700, unit: "pcs" },
      { productName: "Medical Kits", category: "Healthcare", quantity: 500, unit: "sets" },
    ],
  },
  {
    name: "Cambridge Science Park Logistics Centre",
    location: "Cambridge, England",
    coordinates: { lat: 52.2053, lng: 0.1218 },
    capacity: 8600,
    availableSpace: 1500,
    manager: "Rachel Foster",
    inventory: [
      { productName: "Microchips", category: "Electronics", quantity: 2500, unit: "pcs" },
      { productName: "Server Equipment", category: "Technology", quantity: 600, unit: "units" },
      { productName: "Research Instruments", category: "Technology", quantity: 300, unit: "pcs" },
    ],
  },
  {
    name: "Cardiff Bay Logistics Park",
    location: "Cardiff, Wales",
    coordinates: { lat: 51.4816, lng: -3.1791 },
    capacity: 8700,
    availableSpace: 1900,
    manager: "William Hughes",
    inventory: [
      { productName: "Processed Foods", category: "Food & Beverage", quantity: 3400, unit: "kg" },
      { productName: "Canned Goods", category: "Food & Beverage", quantity: 2200, unit: "boxes" },
      { productName: "Packaging Film", category: "Logistics Supplies", quantity: 700, unit: "rolls" },
    ],
  },
  {
    name: "Belfast Harbour Storage Facility",
    location: "Belfast, Northern Ireland",
    coordinates: { lat: 54.5973, lng: -5.93 },
    capacity: 8900,
    availableSpace: 2100,
    manager: "Laura O'Neill",
    inventory: [
      { productName: "Liquor Bottles", category: "Beverage", quantity: 2800, unit: "cases" },
      { productName: "Shipping Containers", category: "Maritime", quantity: 400, unit: "units" },
      { productName: "Cargo Nets", category: "Maritime", quantity: 500, unit: "sets" },
    ],
  },
  {
    name: "Hull Eastern Freight Terminal",
    location: "Hull, England",
    coordinates: { lat: 53.7457, lng: -0.3367 },
    capacity: 9100,
    availableSpace: 1700,
    manager: "Nathan Walker",
    inventory: [
      { productName: "Fish Products", category: "Food & Beverage", quantity: 2600, unit: "kg" },
      { productName: "Frozen Meat", category: "Food & Beverage", quantity: 3200, unit: "kg" },
      { productName: "Packaging Supplies", category: "Logistics Supplies", quantity: 800, unit: "boxes" },
    ],
  },
  {
    name: "Aberdeen Coastal Logistics Hub",
    location: "Aberdeen, Scotland",
    coordinates: { lat: 57.1497, lng: -2.0943 },
    capacity: 8700,
    availableSpace: 1400,
    manager: "Fiona MacLeod",
    inventory: [
      { productName: "Oil Drilling Equipment", category: "Energy", quantity: 300, unit: "pcs" },
      { productName: "Safety Gear", category: "Industrial", quantity: 900, unit: "pcs" },
      { productName: "Fuel Storage Tanks", category: "Energy", quantity: 150, unit: "units" },
    ],
  },
  {
    name: "Reading South Distribution Centre",
    location: "Reading, England",
    coordinates: { lat: 51.4543, lng: -0.9781 },
    capacity: 8200,
    availableSpace: 1600,
    manager: "Jack Taylor",
    inventory: [
      { productName: "Electronics Accessories", category: "Electronics", quantity: 2800, unit: "pcs" },
      { productName: "Cables", category: "Technology", quantity: 1200, unit: "rolls" },
      { productName: "Networking Gear", category: "Technology", quantity: 600, unit: "pcs" },
    ],
  },
  {
    name: "Milton Keynes Freight Park",
    location: "Milton Keynes, England",
    coordinates: { lat: 52.0406, lng: -0.7594 },
    capacity: 9300,
    availableSpace: 2200,
    manager: "Adam Stevens",
    inventory: [
      { productName: "Retail Goods", category: "Retail", quantity: 3200, unit: "pcs" },
      { productName: "Home Appliances", category: "Electronics", quantity: 900, unit: "units" },
      { productName: "Furniture", category: "Home Goods", quantity: 400, unit: "sets" },
    ],
  },
  {
    name: "York Distribution & Storage Park",
    location: "York, England",
    coordinates: { lat: 53.959, lng: -1.0815 },
    capacity: 8600,
    availableSpace: 1500,
    manager: "Samantha Green",
    inventory: [
      { productName: "Books", category: "Publishing", quantity: 4800, unit: "pcs" },
      { productName: "Stationery", category: "Office Supplies", quantity: 2500, unit: "pcs" },
      { productName: "Cardboard Boxes", category: "Logistics Supplies", quantity: 800, unit: "boxes" },
    ],
  },
  {
    name: "Plymouth Marine Storage Facility",
    location: "Plymouth, England",
    coordinates: { lat: 50.3755, lng: -4.1427 },
    capacity: 8700,
    availableSpace: 1900,
    manager: "Megan Harris",
    inventory: [
      { productName: "Marine Equipment", category: "Maritime", quantity: 500, unit: "pcs" },
      { productName: "Fuel Barrels", category: "Energy", quantity: 800, unit: "drums" },
      { productName: "Fishing Nets", category: "Maritime", quantity: 400, unit: "sets" },
    ],
  },
  {
    name: "Exeter West Logistics Hub",
    location: "Exeter, England",
    coordinates: { lat: 50.7184, lng: -3.5339 },
    capacity: 8000,
    availableSpace: 1500,
    manager: "Oliver Davis",
    inventory: [
      { productName: "Fresh Produce", category: "Food & Beverage", quantity: 3200, unit: "kg" },
      { productName: "Dairy Products", category: "Food & Beverage", quantity: 1800, unit: "kg" },
      { productName: "Chilled Drinks", category: "Food & Beverage", quantity: 2500, unit: "litres" },
    ],
  },
  {
    name: "Derby Industrial Freight Park",
    location: "Derby, England",
    coordinates: { lat: 52.9225, lng: -1.4746 },
    capacity: 8800,
    availableSpace: 1800,
    manager: "Katie Morgan",
    inventory: [
      { productName: "Automotive Spares", category: "Automotive", quantity: 1400, unit: "pcs" },
      { productName: "Lubricant Oil", category: "Automotive", quantity: 2500, unit: "litres" },
      { productName: "Engine Parts", category: "Automotive", quantity: 700, unit: "pcs" },
    ],
  },
  {
    name: "Norwich East Logistics Facility",
    location: "Norwich, England",
    coordinates: { lat: 52.6309, lng: 1.2974 },
    capacity: 7600,
    availableSpace: 1400,
    manager: "Henry Clarke",
    inventory: [
      { productName: "Fresh Vegetables", category: "Food & Beverage", quantity: 2200, unit: "kg" },
      { productName: "Packaged Snacks", category: "Retail", quantity: 2000, unit: "pcs" },
      { productName: "Cereal Boxes", category: "Food & Beverage", quantity: 2500, unit: "boxes" },
    ],
  },
  {
    name: "Blackpool Storage & Freight",
    location: "Blackpool, England",
    coordinates: { lat: 53.8175, lng: -3.0357 },
    capacity: 7400,
    availableSpace: 1300,
    manager: "Ella Martin",
    inventory: [
      { productName: "Clothing Items", category: "Apparel", quantity: 3500, unit: "pcs" },
      { productName: "Shoes", category: "Apparel", quantity: 2200, unit: "pairs" },
      { productName: "Accessories", category: "Retail", quantity: 1200, unit: "pcs" },
    ],
  },
  {
    name: "Swansea Bay Logistics Centre",
    location: "Swansea, Wales",
    coordinates: { lat: 51.6214, lng: -3.9436 },
    capacity: 8200,
    availableSpace: 1700,
    manager: "Lucas Edwards",
    inventory: [
      { productName: "Processed Meat", category: "Food & Beverage", quantity: 2000, unit: "kg" },
      { productName: "Canned Foods", category: "Food & Beverage", quantity: 3000, unit: "boxes" },
      { productName: "Beverages", category: "Food & Beverage", quantity: 2800, unit: "litres" },
    ],
  },
  {
    name: "Chester West Freight Facility",
    location: "Chester, England",
    coordinates: { lat: 53.1934, lng: -2.8931 },
    capacity: 7800,
    availableSpace: 1500,
    manager: "Molly Anderson",
    inventory: [
      { productName: "Frozen Desserts", category: "Food & Beverage", quantity: 1600, unit: "kg" },
      { productName: "Confectionery", category: "Retail", quantity: 2300, unit: "pcs" },
      { productName: "Cold Storage Goods", category: "Food & Beverage", quantity: 1200, unit: "kg" },
    ],
  },
  {
    name: "Dundee Northern Storage Centre",
    location: "Dundee, Scotland",
    coordinates: { lat: 56.462, lng: -2.9707 },
    capacity: 7600,
    availableSpace: 1400,
    manager: "Ewan Fraser",
    inventory: [
      { productName: "Fishing Equipment", category: "Maritime", quantity: 600, unit: "pcs" },
      { productName: "Fish Crates", category: "Food & Beverage", quantity: 800, unit: "crates" },
      { productName: "Ice Storage", category: "Industrial", quantity: 500, unit: "tons" },
    ],
  },
  {
    name: "Luton Airport Cargo Terminal",
    location: "Luton, England",
    coordinates: { lat: 51.8787, lng: -0.42 },
    capacity: 9700,
    availableSpace: 2500,
    manager: "Grace Roberts",
    inventory: [
      { productName: "Air Cargo", category: "Aviation", quantity: 1200, unit: "crates" },
      { productName: "Export Goods", category: "Aviation", quantity: 1500, unit: "boxes" },
      { productName: "Electronics", category: "Technology", quantity: 1000, unit: "pcs" },
    ],
  },
  {
    name: "Peterborough Distribution Park",
    location: "Peterborough, England",
    coordinates: { lat: 52.5695, lng: -0.2405 },
    capacity: 8300,
    availableSpace: 1600,
    manager: "Jacob Lee",
    inventory: [
      { productName: "Fresh Produce", category: "Food & Beverage", quantity: 2200, unit: "kg" },
      { productName: "Dry Food", category: "Food & Beverage", quantity: 2500, unit: "boxes" },
      { productName: "Packaging Materials", category: "Logistics Supplies", quantity: 700, unit: "boxes" },
    ],
  },
  {
    name: "Brighton Coastal Freight Terminal",
    location: "Brighton, England",
    coordinates: { lat: 50.8225, lng: -0.1372 },
    capacity: 7900,
    availableSpace: 1400,
    manager: "Jessica Price",
    inventory: [
      { productName: "Seafood", category: "Food & Beverage", quantity: 1800, unit: "kg" },
      { productName: "Frozen Goods", category: "Food & Beverage", quantity: 2600, unit: "kg" },
      { productName: "Packaging Film", category: "Logistics Supplies", quantity: 600, unit: "rolls" },
    ],
  },
  {
    name: "Bath Logistics and Storage Hub",
    location: "Bath, England",
    coordinates: { lat: 51.3758, lng: -2.3599 },
    capacity: 7500,
    availableSpace: 1200,
    manager: "Sophie Reed",
    inventory: [
      { productName: "Cosmetics", category: "Retail", quantity: 2000, unit: "pcs" },
      { productName: "Health Supplements", category: "Healthcare", quantity: 1200, unit: "bottles" },
      { productName: "Personal Care Items", category: "Retail", quantity: 800, unit: "pcs" },
    ],
  },
];

// const connectDBFORSEEDING = async ()=>{
// 	try{
// 		const conn = await mongoose.connect(process.env.MONGO_URI);
// 		console.log(`📦 MongoDB connected: ${conn.connection.host}`);
// 	}catch (error) {
// 		console.error(`❌ MongoDB connection error: ${error.message}`);
// 		process.exit(1);
// 	}
// }

const importData = async ()=>{
	try{
		await connectDB();
		await Warehouse.deleteMany();
		await Warehouse.insertMany(warehouses);
		console.log("Warehouses data seeded successfully")
		process.exit();
	}catch(error){
		console.error("Error seeding warehouses data", error)
		process.exit(1);
	}
}
importData();
