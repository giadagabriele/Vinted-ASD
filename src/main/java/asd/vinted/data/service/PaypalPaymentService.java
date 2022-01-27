package asd.vinted.data.service;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.PayPalConfirmPaymentResponse;
import asd.vinted.data.payment.PayPalPaymentResponse;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public interface PaypalPaymentService {

    public Payment createPayment(OrderDto _order, String cancelUrl, String successUrl) throws PayPalRESTException;
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
    public PayPalPaymentResponse paymentCreatResponse( Payment payment);
    public PayPalConfirmPaymentResponse paymentConfiramtionResponse( Payment payment,String paymentId,String productID,String userID);
}
