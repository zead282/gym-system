import { Router } from "express";
import * as controller from './contact.controller.js'
import expressAsyncHandler from "express-async-handler";
import { authntication } from "../../middlewares/authntication.js";


const router=Router()

router.post('/addContact',expressAsyncHandler(controller.addContact))
router.get('/getContact',authntication(),expressAsyncHandler(controller.getAllContact))
router.put('/updateContact/:_id',authntication(),expressAsyncHandler(controller.updateContact))
router.delete('/deleteContact/:_id',authntication(),expressAsyncHandler(controller.deleteContact))













export default router