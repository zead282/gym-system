import { Router } from "express";
import { authntication } from "../../middlewares/authntication.js"
import * as trainercontroller from './trainer.controller.js'
import expressAsyncHandler from "express-async-handler";

import { multermiddlehost } from "../../middlewares/multer.js";
import { extentions } from "../../utils/allowextentions.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { addTrainerSchema } from "./trainer.schema.js";

const router=Router()

router.post('/add',authntication(),multermiddlehost({extention:extentions.image}).single('image'),validation(addTrainerSchema),expressAsyncHandler(trainercontroller.addtrainer))


router.delete('/delete/:trainerid',authntication(),expressAsyncHandler(trainercontroller.deletetrainer))

router.get('/trainers',expressAsyncHandler(trainercontroller.get_all_trainers))

router.put('/update/:trainerid',authntication(),multermiddlehost({extention:extentions.image}).single('image'),expressAsyncHandler(trainercontroller.update_trainer))
export default router