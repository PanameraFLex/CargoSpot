import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config()

const PORT = process.env.PORT;

//CONNECT TO DB

connectDB();

//start server
app.listen(PORT, ()=>{
	console.log(`✅Server running on PORT ${PORT}`)
});