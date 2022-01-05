package asd.vinted.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:4200")

public class StripPaymentController {

    @PostMapping("/creat-payment-intent")
    public void creatPaymentIntent()
    {
//CreatPayment postBody=gson.fromJson(request.body(),CreatPayment.class);
//PaymentIntentCreateParams creatParams=new PaymentIntentCreateParams.Builder()
//        .setCurrency("usd")
//        .SetAmount(new Long(calculateOrderAmount(postBody.getItems())));
//        .build();
//        //creat payment Intent with the order amount and currency
//
    }
}
