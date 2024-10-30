import { Router } from "express";
import { authntication } from "../../middlewares/authntication.js";
import expressAsyncHandler from "express-async-handler";
import * as servicecontroller from './service.controller.js'
import { multermiddlehost } from "../../middlewares/multer.js";
import { extentions } from "../../utils/allowextentions.js";

const router=Router()

router.post('/add',authntication(),multermiddlehost({extention:extentions.image}).single('image'),expressAsyncHandler(servicecontroller.addservice))

router.get('/',expressAsyncHandler(servicecontroller.get_all_services))

router.delete('/delete/:serviceid',authntication(),expressAsyncHandler(servicecontroller.delete_service))

router.put('/update/:serviceid',authntication(),multermiddlehost({extention:extentions.image}).single('image'),expressAsyncHandler(servicecontroller.update_service))


export default router