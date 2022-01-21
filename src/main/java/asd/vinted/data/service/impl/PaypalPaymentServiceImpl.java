package asd.vinted.data.service.impl;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.PayPalConfirmPaymentResponse;
import asd.vinted.data.payment.PayPalPaymentResponse;
import asd.vinted.data.service.OrderService;
import asd.vinted.data.service.PaypalPaymentService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.paypal.base.rest.PayPalRESTException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaypalPaymentServiceImpl implements PaypalPaymentService {
    @Autowired
    private APIContext apiContext;

    @Autowired
    private OrderService orderService;

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

    @Override
    public PayPalPaymentResponse paymentCreatResponse(Payment payment) {
        PayPalPaymentResponse response = null;
        String message ="";

        try {
            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    response = new PayPalPaymentResponse();
                    response.setStatus(true);
                    response.setUrl(link.getHref());
                    return response;
                }
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
            message= ex.getMessage();
        }
        return response;
    }

    @Override
    public PayPalConfirmPaymentResponse paymentConfiramtionResponse(Payment payment,String paymentId) {

        double[] amount = {0.0};
        String[] currency={""};
        String[] description={""};
        PayPalConfirmPaymentResponse response=null;
        try {
            //System.out.println(payment.toJSON());
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
                response.setPaymentDate(payment.getUpdateTime() !=null ?payment.getUpdateTime().substring(0,10)+" "+payment.getUpdateTime().substring(11,16):null);
                response.setPayerName(payment.getPayer().getPayerInfo().getFirstName()+" "+payment.getPayer().getPayerInfo().getLastName());
                //response.setPayeeName(payment.getPayee().getFirstName()+" "+payment.getPayee().getLastName());
                response.setAddressLine1(payment.getPayer().getPayerInfo().getShippingAddress().getLine1());
                response.setCity(payment.getPayer().getPayerInfo().getShippingAddress().getCity());
                response.setCountryCode(payment.getPayer().getPayerInfo().getShippingAddress().getCountryCode());
                response.setPostalCode(payment.getPayer().getPayerInfo().getShippingAddress().getPostalCode());
                response.setPayerEmail(payment.getPayer().getPayerInfo().getEmail());
                response.setState(payment.getPayer().getPayerInfo().getShippingAddress().getState());
                response.setPayer_id(payment.getPayer().getPayerInfo().getPayerId());

                // response.setPaymentMode(payment.getTransactions().);
                OrderDto orderDto = new OrderDto();
                orderDto.setPrice(response.getPaidPrice());


                payment.getTransactions().forEach(transaction -> {
                    currency[0]= transaction.getAmount().getCurrency();

                });

                // Save Order details to DB
                orderDto.setMethod(payment.getPayer().getPaymentMethod());
                orderDto.setCurrency(currency[0]);
                orderDto.setDescription("I paid for my order");
                orderDto.setIntent("Sale");
                orderDto.setPaymentID(response.getPaymentID());
                orderDto.setPayer_id( response.getPayer_id());
                orderDto.setPayeeName(response.getPayerName());
                orderDto.setPaymentDate(response.getPaymentDate());
                orderDto.setPayerEmail(response.getPayerEmail());

                orderService.saveOrderDetails(orderDto);

                return response;
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        return response;
    }
}
