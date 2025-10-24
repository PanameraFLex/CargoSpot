import express, { Router } from "express";
const router = express.Router();

router.get("/", (req,res)=>{
	res.json({message: "Warehouse API is working 🚀"})
})

export default Router;