import { Router } from "express";
import * as controller from './user.controller.js'
import expressAsyncHandler from "express-async-handler";
import { authntication } from "../../middlewares/authntication.js";



const router=Router()

router.post('/createUser',controller.createUser)
router.get('/getallusers',authntication() ,expressAsyncHandler(controller.getALLUsers))
router.put('/updateuser/:_id',authntication(),controller.updateUser)
router.delete('/deleteuser/:_id',authntication(),expressAsyncHandler(controller.deleteUser))





export default router