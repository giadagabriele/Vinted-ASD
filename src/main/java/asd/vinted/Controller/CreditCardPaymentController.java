package asd.vinted.Controller;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import asd.vinted.data.payment.CreditCardPaymentResponse;
import asd.vinted.data.service.CreditCardPaymentService;
import asd.vinted.data.service.PaypalPaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:4200")
public class CreditCardPaymentController{
    @Autowired
    CreditCardPaymentService ccPaymentService;

    //CommonConstant.PAYMENT_CREATE_STRIPE
    @PostMapping("/CreditCard")
    public ResponseEntity<CreditCardPaymentResponse> stripePaymentCreate(@RequestBody OrderDto createPayment){
       return ResponseEntity.ok().body(ccPaymentService.CreatCreditCardPayment(createPayment));
    }
}
