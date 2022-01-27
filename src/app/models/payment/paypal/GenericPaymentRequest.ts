export class GenericPaymentRequest{
    price: number;
    currency: string;
    method: string;
    intent: string;
    description: string;
    successURL: string;
    cancelURL: string;
    stripeToken: string;
    stripeEmail: string;
    productID: string;   
    userID:number;
    
  }
  