
import { Router } from "express";

import * as paymentcontroller from './payment.controller.js'
import expressAsyncHandler from "express-async-handler";

const router=Router()

router.post('/paymob/:planid',
    expressAsyncHandler(paymentcontroller.createpayment))

    .get('/get-all-payments',paymentcontroller.getAllPayments)
    .get('/webhook',paymentcontroller.webhook)
export default router