package asd.vinted.Controller;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.PayPalConfirmPaymentResponse;
import asd.vinted.data.payment.PayPalPaymentResponse;
import asd.vinted.data.service.PaypalPaymentService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:4200")
public class PayPalPaymentController {

    @Autowired
    PaypalPaymentService paypalService;

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
            Payment payment = paypalService.createPayment(_order, "http://localhost:8080/" + CANCEL_URL,
                    "http://localhost:8080/" + SUCCESS_URL);

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
            Payment payment = paypalService.executePayment(paymentId,payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                response = new PayPalConfirmPaymentResponse();
                response.setStatus("approved");
                response.setPaymentID(paymentId);

                payment.getTransactions().forEach(transaction -> {
                    if (!transaction.getAmount().getTotal().isEmpty()){
                        amount[0] += (Double.parseDouble(transaction.getAmount().getTotal()));
                    }
                });
                response.setPaidPrice(amount[0]);
                response.setPaymentDate(payment.getUpdateTime());
                response.setPayerName(payment.getPayer().getPayerInfo().getFirstName()+" "+payment.getPayer().getPayerInfo().getLastName());
                //response.setPayeeName(payment.getPayee().getFirstName()+" "+payment.getPayee().getLastName());
                response.setAddressLine1(payment.getPayer().getPayerInfo().getShippingAddress().getLine1());
                response.setCity(payment.getPayer().getPayerInfo().getShippingAddress().getCity());
                response.setCountryCode(payment.getPayer().getPayerInfo().getShippingAddress().getCountryCode());
                response.setPostalCode(payment.getPayer().getPayerInfo().getShippingAddress().getPostalCode());
                response.setState(payment.getPayer().getPayerInfo().getShippingAddress().getState());

               // response.setPaymentMode(payment.getTransactions().);
                return ResponseEntity.ok().body(response);
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return  ResponseEntity.ok().body(response);
    }
}
