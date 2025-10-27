import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./configs/db.js"
import userRouter from "./routes/userRoutes.js"

dotenv.config()

const app=express()

// Databse Connection
 await connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/api/user",userRouter)

const PORT=process.env.PORT||4000
app.listen(PORT,()=>{
    console.log(`Server is Listening at PORT :`,PORT)
})