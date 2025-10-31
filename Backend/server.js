import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./configs/db.js"
import userRouter from "./routes/userRoutes.js"
import chatRouter from "./routes/chatRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import creditRouter from "./routes/creditRoute.js"
import { stripeWebhooks } from "./controllers/webhooks.js"

dotenv.config()

const app=express()

// Databse Connection
 await connectDB()

//  Stripe webhooks 
app.post("/api/stripe",express.raw({type:"application/json"}),stripeWebhooks)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Routes for user
app.use("/api/user",userRouter)

// Routes for chats
app.use("/api/chat",chatRouter)

// Router for prompts like text and image 
app.use("/api/message",messageRouter)

// Router for purchas plan 
app.use("/api/credit",creditRouter)

app.get("/", (req, res) => {
  res.send("Server is working fine");
});

const PORT=process.env.PORT||4000
app.listen(PORT,()=>{
    console.log(`Server is Listening at PORT :`,PORT)
})