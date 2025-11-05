import mongoose from "mongoose";
import dotenv from "dotenv";
import Warehouse from "../models/warehouseModel.js";
import connectDB from "../config/db.js";

dotenv.config();

const warehouses = [
  {
    name: "London Gateway Distribution Centre",
    location: "London, England",
    geo: { type: "Point", coordinates: [-0.118092, 51.509865] },
    capacity: 15000,
    availableSpace: 3200,
    manager: "Sarah Johnson",
    inventory: [
      { productName: "Consumer Electronics", category: "Electronics", quantity: 500 },
      { productName: "Mobile Accessories", category: "Electronics", quantity: 1200 },
    ],
  },
  {
    name: "Manchester North Freight Hub",
    location: "Manchester, England",
    geo: { type: "Point", coordinates: [-2.242631, 53.480759] },
    capacity: 12000,
    availableSpace: 2500,
    manager: "Tom Davies",
    inventory: [
      { productName: "Textiles", category: "Retail", quantity: 400 },
      { productName: "Shoes", category: "Apparel", quantity: 600 },
    ],
  },
  {
    name: "Birmingham Midlands Storage Hub",
    location: "Birmingham, England",
    geo: { type: "Point", coordinates: [-1.890401, 52.486243] },
    capacity: 14000,
    availableSpace: 1800,
    manager: "Lydia Shaw",
    inventory: [
      { productName: "Furniture", category: "Home & Living", quantity: 300 },
      { productName: "Mattresses", category: "Home & Living", quantity: 150 },
    ],
  },
  {
    name: "Leeds Northern Distribution Centre",
    location: "Leeds, England",
    geo: { type: "Point", coordinates: [-1.549077, 53.800755] },
    capacity: 9500,
    availableSpace: 1200,
    manager: "Craig Edwards",
    inventory: [
      { productName: "Books", category: "Publishing", quantity: 1000 },
      { productName: "Stationery", category: "Office", quantity: 800 },
    ],
  },
  {
    name: "Glasgow Freight & Cold Storage Facility",
    location: "Glasgow, Scotland",
    geo: { type: "Point", coordinates: [-4.251806, 55.864237] },
    capacity: 11000,
    availableSpace: 3000,
    manager: "Laura McGregor",
    inventory: [
      { productName: "Seafood", category: "Food & Beverage", quantity: 500 },
      { productName: "Frozen Vegetables", category: "Food & Beverage", quantity: 700 },
    ],
  },
  {
    name: "Liverpool Maritime Logistics Park",
    location: "Liverpool, England",
    geo: { type: "Point", coordinates: [-2.977938, 53.408371] },
    capacity: 10000,
    availableSpace: 2700,
    manager: "David Roberts",
    inventory: [
      { productName: "Containerized Goods", category: "Shipping", quantity: 400 },
      { productName: "Auto Parts", category: "Industrial", quantity: 800 },
    ],
  },
  {
    name: "Bristol Southwest Logistics Hub",
    location: "Bristol, England",
    geo: { type: "Point", coordinates: [-2.58791, 51.454514] },
    capacity: 8500,
    availableSpace: 2000,
    manager: "Alice Morton",
    inventory: [
      { productName: "Wine Bottles", category: "Beverage", quantity: 1000 },
      { productName: "Spirits", category: "Beverage", quantity: 700 },
    ],
  },
  {
    name: "Sheffield Steelworks Storage",
    location: "Sheffield, England",
    geo: { type: "Point", coordinates: [-1.470085, 53.381129] },
    capacity: 13000,
    availableSpace: 2400,
    manager: "Harrison Cole",
    inventory: [
      { productName: "Steel Sheets", category: "Construction", quantity: 600 },
      { productName: "Metal Rods", category: "Construction", quantity: 450 },
    ],
  },
  {
    name: "Nottingham Midlands Freight Terminal",
    location: "Nottingham, England",
    geo: { type: "Point", coordinates: [-1.149066, 52.954783] },
    capacity: 9200,
    availableSpace: 1500,
    manager: "Chloe Patel",
    inventory: [
      { productName: "Sportswear", category: "Retail", quantity: 700 },
      { productName: "Sneakers", category: "Footwear", quantity: 600 },
    ],
  },
  {
    name: "Leicester Distribution & Storage Centre",
    location: "Leicester, England",
    geo: { type: "Point", coordinates: [-1.133953, 52.636878] },
    capacity: 8000,
    availableSpace: 2200,
    manager: "Ethan Parker",
    inventory: [
      { productName: "Groceries", category: "Retail", quantity: 900 },
      { productName: "Cleaning Supplies", category: "Household", quantity: 400 },
    ],
  },
  {
    name: "Cambridge Biomedical Storage Facility",
    location: "Cambridge, England",
    geo: { type: "Point", coordinates: [0.121817, 52.205337] },
    capacity: 6000,
    availableSpace: 900,
    manager: "Jessica Hall",
    inventory: [
      { productName: "Lab Equipment", category: "Medical", quantity: 350 },
      { productName: "Reagents", category: "Medical", quantity: 250 },
    ],
  },
  {
    name: "Oxford Academic Logistics Park",
    location: "Oxford, England",
    geo: { type: "Point", coordinates: [-1.257677, 51.752022] },
    capacity: 7000,
    availableSpace: 1200,
    manager: "Patrick Walsh",
    inventory: [
      { productName: "Books", category: "Publishing", quantity: 800 },
      { productName: "Journals", category: "Publishing", quantity: 400 },
    ],
  },
  {
    name: "Edinburgh Highland Logistics Centre",
    location: "Edinburgh, Scotland",
    geo: { type: "Point", coordinates: [-3.188267, 55.953251] },
    capacity: 10000,
    availableSpace: 2500,
    manager: "Fraser MacLeod",
    inventory: [
      { productName: "Whisky Barrels", category: "Beverage", quantity: 300 },
      { productName: "Glass Bottles", category: "Packaging", quantity: 700 },
    ],
  },
  {
    name: "Cardiff Seaport Warehouse",
    location: "Cardiff, Wales",
    geo: { type: "Point", coordinates: [-3.17909, 51.481583] },
    capacity: 9000,
    availableSpace: 1800,
    manager: "Rhys Morgan",
    inventory: [
      { productName: "Ship Supplies", category: "Maritime", quantity: 600 },
      { productName: "Canned Goods", category: "Food", quantity: 800 },
    ],
  },
  {
    name: "Newcastle Tyne Industrial Hub",
    location: "Newcastle upon Tyne, England",
    geo: { type: "Point", coordinates: [-1.617439, 54.978252] },
    capacity: 11000,
    availableSpace: 2600,
    manager: "Samantha Brown",
    inventory: [
      { productName: "Machinery Parts", category: "Industrial", quantity: 500 },
      { productName: "Lubricants", category: "Industrial", quantity: 300 },
    ],
  },
  {
    name: "Hull East Coast Storage Facility",
    location: "Hull, England",
    geo: { type: "Point", coordinates: [-0.336741, 53.744339] },
    capacity: 8500,
    availableSpace: 1200,
    manager: "Adam Stevenson",
    inventory: [
      { productName: "Fish Products", category: "Food", quantity: 400 },
      { productName: "Frozen Goods", category: "Food", quantity: 700 },
    ],
  },
  {
    name: "Plymouth South Dock Warehouse",
    location: "Plymouth, England",
    geo: { type: "Point", coordinates: [-4.142656, 50.375456] },
    capacity: 8000,
    availableSpace: 1700,
    manager: "Grace Andrews",
    inventory: [
      { productName: "Marine Equipment", category: "Maritime", quantity: 300 },
      { productName: "Paints & Coatings", category: "Industrial", quantity: 200 },
    ],
  },
  {
    name: "Aberdeen Northern Oil Supply Base",
    location: "Aberdeen, Scotland",
    geo: { type: "Point", coordinates: [-2.095354, 57.149651] },
    capacity: 13000,
    availableSpace: 2800,
    manager: "Callum Fraser",
    inventory: [
      { productName: "Oil Drums", category: "Energy", quantity: 500 },
      { productName: "Pipes", category: "Energy", quantity: 400 },
    ],
  },
  {
    name: "Swansea Industrial Distribution Centre",
    location: "Swansea, Wales",
    geo: { type: "Point", coordinates: [-3.940929, 51.621441] },
    capacity: 9500,
    availableSpace: 2100,
    manager: "Bethan Hughes",
    inventory: [
      { productName: "Hardware Tools", category: "Construction", quantity: 600 },
      { productName: "Paint Supplies", category: "Retail", quantity: 350 },
    ],
  },
  {
    name: "York Central Storage & Logistics",
    location: "York, England",
    geo: { type: "Point", coordinates: [-1.080278, 53.959965] },
    capacity: 7800,
    availableSpace: 1400,
    manager: "Oliver Bennett",
    inventory: [
      { productName: "Art Supplies", category: "Retail", quantity: 400 },
      { productName: "Books", category: "Retail", quantity: 900 },
    ],
  }
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
