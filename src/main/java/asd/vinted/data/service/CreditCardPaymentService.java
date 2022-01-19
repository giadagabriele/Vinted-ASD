package asd.vinted.data.service;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.CreditCardPaymentResponse;
import org.springframework.stereotype.Service;

@Service
public interface CreditCardPaymentService {

    public CreditCardPaymentResponse CreatCreditCardPayment(OrderDto createPayment);
}
