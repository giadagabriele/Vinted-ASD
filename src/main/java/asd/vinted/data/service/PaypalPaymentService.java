package asd.vinted.data.service;

import asd.vinted.data.dto.OrderDto;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.stereotype.Service;

@Service
public interface PaypalPaymentService {

    public Payment createPayment(OrderDto _order, String cancelUrl, String successUrl) throws PayPalRESTException;
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

}
