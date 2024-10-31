import axios from "axios";


export const authenticate = async () => {
    try {
      const response = await axios.post('https://accept.paymobsolutions.com/api/auth/tokens', {
        api_key:process.env.api_key_paymob,
      });
  
      const token = response.data.token;
      return token;
    } catch (error) {
      console.error('Error authenticating:', error);
      throw error;
    }
  };


  export const createOrder = async (accessToken, amountCents) => {
    try {
      const response = await axios.post('https://accept.paymobsolutions.com/api/ecommerce/orders', {
        auth_token: accessToken,
        delivery_needed: 'false',
        amount_cents: amountCents,
        currency: 'EGP', // You can change it to your currency
        items: [], // You can add items to the order
      });
  
      const orderId = response.data.id;
      return orderId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };


  export const generatePaymentKey = async (accessToken, orderId, userdata,amountCents) => {
    try {
      const response = await axios.post('https://accept.paymobsolutions.com/api/acceptance/payment_keys', {
        auth_token: accessToken,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: 'NA',
          email:userdata.email,
          floor: 'NA',
          first_name:userdata.name,
          street: 'Some Street',
          building: '123',
          phone_number:userdata.phone,
          shipping_method: 'PKG',
          postal_code: '12345',
          city: 'Cairo',
          country: 'EG',
          last_name: 'Doe',
          state: 'NA',
        },
        currency: 'EGP', // Set your currency here
        integration_id:4835002, // Provided by Paymob
      });
  
  
      const paymentKey = response.data.token;
      return paymentKey;
    } catch (error) {
      console.error('Error generating payment key:', error);
      throw error;
    }
  };


  export  const getTransactionsFromPaymob = async (token) => {
    
    try {
      const response = await axios.get(`https://accept.paymob.com/api/acceptance/subscriptions/${process.env.subscriptions}/transactions?page_size=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
    );
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions from Paymob:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch transactions');
    }
  }