
import { Router } from "express";

import * as paymentcontroller from './payment.controller.js'
import expressAsyncHandler from "express-async-handler";
import { authntication } from "../../middlewares/authntication.js";

const router=Router()

router.post('/paymob/:planid',
    expressAsyncHandler(paymentcontroller.createpayment))

    .get('/get-all-payments',authntication(),paymentcontroller.getAllPayments)
    .get('/webhook',paymentcontroller.webhook)


export default router