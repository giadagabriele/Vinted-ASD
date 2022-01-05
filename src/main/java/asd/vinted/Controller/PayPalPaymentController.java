package asd.vinted.Controller;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.entity.Order;
import asd.vinted.data.service.PaypalOrderService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:8090")
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
    public String payment(@RequestBody OrderDto _order) {
        String message ="";
        //@RequestBody ProfileDetailsDto profileDetail
        try {
            Payment payment = paypalOrderService.createPayment(_order.getPrice(), _order.getCurrency(), _order.getMethod(),
                    _order.getIntent(), _order.getDescription(), "http://localhost:8090/" + CANCEL_URL,
                    "http://localhost:8090/" + SUCCESS_URL);

            System.out.println(payment);

            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    message= "redirect:"+link.getHref();
                }
            }

        } catch (PayPalRESTException e) {

            e.printStackTrace();
            message= e.getMessage();
        }
//        return "redirect:/";
        return  message;
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "cancel";
    }

    @GetMapping(value = SUCCESS_URL)
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = paypalOrderService.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                return "success";
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return "redirect:/";
    }

}
