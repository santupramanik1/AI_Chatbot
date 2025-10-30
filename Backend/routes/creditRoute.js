import express from "express"
import { getPlans, purchasePlans } from "../controllers/creditController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const creditRouter=express.Router()

creditRouter.get("/plan",getPlans)
creditRouter.post("/purchas",authMiddleware,purchasePlans)

export default creditRouter