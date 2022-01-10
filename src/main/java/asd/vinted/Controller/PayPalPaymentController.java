package asd.vinted.Controller;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.entity.Order;
import asd.vinted.data.payment.PayPalConfirmPaymentRequest;
import asd.vinted.data.payment.PayPalConfirmPaymentResponse;
import asd.vinted.data.payment.PayPalPaymentResponse;
import asd.vinted.data.service.PaypalOrderService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:4200")
public class PayPalPaymentController {

    @Autowired
    PaypalOrderService paypalOrderService;

    public static final String SUCCESS_URL = "pay/success";
    public static final String CANCEL_URL = "pay/cancel";

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
            Payment payment = paypalOrderService.createPayment(_order, "http://localhost:8090/" + CANCEL_URL,
                    "http://localhost:8090/" + SUCCESS_URL);

//            System.out.println(payment);

            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    response = new PayPalPaymentResponse();
                    response.setStatus(true);
                    response.setUrl(link.getHref());
                    return ResponseEntity.ok().body(response);
                }
            }

        } catch (PayPalRESTException e) {

            e.printStackTrace();
            message= e.getMessage();
        }
        System.out.println("Payment created");
//        return "redirect:/";
        return  ResponseEntity.ok().body(response);
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "cancel";
    }

    @GetMapping(value = SUCCESS_URL)
    public ResponseEntity<PayPalConfirmPaymentResponse> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        double[] amount = {0.0};
        PayPalConfirmPaymentResponse response=null;
        try {
            Payment payment = paypalOrderService.executePayment(paymentId,payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                response = new PayPalConfirmPaymentResponse();
                response.setStatus("approved");
                response.setPaymentID(payment.getId());

                payment.getTransactions().forEach(transaction -> {
                    if (!transaction.getAmount().getTotal().isEmpty()){
                        amount[0] += (Double.parseDouble(transaction.getAmount().getTotal()));
                    }
                });
                response.setPaidPrice(amount[0]);

                return ResponseEntity.ok().body(response);
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return  ResponseEntity.ok().body(response);
    }
}
