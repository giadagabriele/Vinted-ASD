package asd.vinted.data.service.impl;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.service.PaypalPaymentService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaypalPaymentServiceImpl implements PaypalPaymentService {
    @Autowired
    private APIContext apiContext;

    @Override
    public Payment createPayment(OrderDto _order,String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(_order.getCurrency());
        _order.setPrice(new BigDecimal(_order.getPrice()).setScale(2, RoundingMode.HALF_UP).doubleValue());
        amount.setTotal(String.format("%.3f", _order.getPrice()));

        Transaction transaction = new Transaction();
        transaction.setDescription(_order.getDescription());
        transaction.setAmount(amount);

        List transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(_order.getMethod().toString());

        Payment payment = new Payment();
        payment.setIntent(_order.getIntent().toString());
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(_order.getCancelURL());
        redirectUrls.setReturnUrl(_order.getSuccessURL());
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    @Override
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }
}
