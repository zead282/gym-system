import { Router } from "express";
import { authntication } from "../../middlewares/authntication.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as controller from './plan.controller.js'
import expressAsyncHandler from "express-async-handler";
import { planSchema } from "./plan.schema.js";




const router = Router();




router.post('/create' , authntication(),validation(planSchema),expressAsyncHandler(controller.createPlan))
router.get('/getALLPlans' ,expressAsyncHandler(controller.getALLPlans))
router.put('/updatePlans/:_id' , authntication(),expressAsyncHandler(controller.updatePlans))
router.delete('/deletePlan/:_id',authntication(),expressAsyncHandler(controller.deletePlan))


export default router