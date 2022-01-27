package asd.vinted.Controller;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.PayPalConfirmPaymentResponse;
import asd.vinted.data.payment.PayPalPaymentResponse;
import asd.vinted.data.service.OrderService;
import asd.vinted.data.service.PaypalPaymentService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:4200")
public class PayPalPaymentController {

    @Autowired
    PaypalPaymentService paypalService;

    public static final String SUCCESS_URL = "pay/success";
    public static final String CANCEL_URL = "pay/cancel";

    private  static String productID;

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @PostMapping("/pay")
    public ResponseEntity<PayPalPaymentResponse> payment(@RequestBody OrderDto _order) {

        PayPalPaymentResponse response = null;
        String message ="";
        //@RequestBody ProfileDetailsDto profileDetail
        try {
            Payment payment = paypalService.createPayment(_order, "http://localhost:8080/" + CANCEL_URL,
                    "http://localhost:8080/" + SUCCESS_URL);

            response=paypalService.paymentCreatResponse(payment);

            response.setProductID(_order.getProductID());

            return ResponseEntity.ok().body(response);

        } catch (PayPalRESTException e) {

            e.printStackTrace();
            message= e.getMessage();
        }

        return  ResponseEntity.ok().body(response);
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "cancel";
    }

    @GetMapping(value = SUCCESS_URL)
    public ResponseEntity<PayPalConfirmPaymentResponse> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId,@RequestParam("UserID") String userID,@RequestParam("ProductID") String productID) {

        PayPalConfirmPaymentResponse response=null;
        try {

            Payment payment = paypalService.executePayment(paymentId,payerId);

            response=paypalService.paymentConfiramtionResponse(payment,paymentId,productID,userID);


            return ResponseEntity.ok().body(response);


        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return  ResponseEntity.ok().body(response);
    }
}
