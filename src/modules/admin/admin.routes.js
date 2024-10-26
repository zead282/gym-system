import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as admincontroller from './admin.controller.js'
import { authntication } from "../../middlewares/authntication.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { adminSchema } from "./admin.schema.js";
const router=Router()

router.post('/add',authntication(),validation(adminSchema),expressAsyncHandler(admincontroller.addadmin))

router.post('/login',expressAsyncHandler(admincontroller.login))

export default router