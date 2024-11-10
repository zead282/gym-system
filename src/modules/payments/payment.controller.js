import { authenticate,createOrder,generatePaymentKey, getTransactionsFromPaymob } from "../../payment-handler/payment.js";

import { paymentStatus } from "../../utils/enums.js";
import { Users ,Plans,PaymentModel } from "../../../db/models/index.models.js";
import generateUniqueString from "../../utils/generate-unique-str.js";
export const createpayment=async (req,res,next)=>{ 

    const{planid}=req.params
    const{name,email,phoneNumber,plan}=req.body

    ///check on consultation
    const planiExist=await Plans.findById(planid)
    if(!planiExist) return next(Error("plan not found",404))
      console.log(planiExist);
      
        
            // 1. Authenticate to get access token
            const price = planiExist.price *10
            const userdata={name,email,phoneNumber,plan}

            const token = await authenticate();
            
            // 2. Create an order
            const orderId = await createOrder(token, price); // amount in cents (e.g., 10000 = 100.00 EGP)

            // 3. Generate a payment key
            const paymentKey = await generatePaymentKey(token, orderId, userdata,price);
           
            // You can now send the payment key to the frontend to use with Paymob's payment gateway    
            const checkOutSessionLink = `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.iframsId}?payment_token=${paymentKey}`;
          // save in db 
          const payment=await PaymentModel.create({plan,name,phoneNumber,email,transaction_id:orderId,price})
        
          res.status(200).json({checkOutSession:checkOutSessionLink})
          
}



export const getAllPayments=async (req,res,next)=>{
  
  const payments=await PaymentModel.find({payment_status:paymentStatus.success})
  res.status(200).json({payments})
}


// export const webhook = (req, res, next) => {
//   const data = req.query
//   console.log(data);
  
//   res.status(200).json({message:"Webhook received",data});
// };

export const webhook=async(req,res,next)=>{
  try {
    // Log the raw body and headers to inspect what you're receiving
    //console.log('quey:', req.query); // This is already parsed as an object if express.json() is used

    // If req.body is empty, handle it
    if (!req.query || Object.keys(req.query).length === 0) {
      next(new ErrorClass('Received an empty webhook payload.', 400,'No data received'));
    }

    // Extract data from the body (if it's a POST with JSON payload)
    const {  success, order, txn_response_code} = req.query;
     

     const membershipID=generateUniqueString(5)
     
    // Check if the transaction was successful
    if ((success === true || success === 'true') && txn_response_code=='APPROVED') {
      // update payment status
      const updatePaymentData=await PaymentModel.findOneAndUpdate({transaction_id:order},{
        payment_status:paymentStatus.success},{new:true});

      const userpay= await Users.create({email:updatePaymentData.email,plan:updatePaymentData.plan,name:updatePaymentData.name,phone:updatePaymentData.phoneNumber,membershipID})
      res.status(200).json({ message: 'paid' }); 
    } else {
      res.status(400).json({ message: 'unpaid' });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ message: 'Internal server error', error_msg: error.message });
  }
};