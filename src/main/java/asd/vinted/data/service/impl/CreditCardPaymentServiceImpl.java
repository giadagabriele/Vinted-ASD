package asd.vinted.data.service.impl;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.CreditCardConfig;
import asd.vinted.data.payment.CreditCardPaymentResponse;
import asd.vinted.data.service.CreditCardPaymentService;
import asd.vinted.data.service.OrderService;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class CreditCardPaymentServiceImpl implements CreditCardPaymentService {
    @Autowired
    private CreditCardConfig config;
    @Autowired
    private OrderService orderService;

    @Override
    public CreditCardPaymentResponse CreatCreditCardPayment(OrderDto createPayment) {

        CreditCardPaymentResponse response = null;
        try {
           // Stripe.apiKey = config.getApiKey();
           Stripe.apiKey = "sk_test_51KJQYrGYh3JcLLFyylP8w7TExdqsgiuPvCHt3LUi5m1ZTpotdGHQZpLLkmddpl1QEOOuE2uXvFkFRfZmE087K7uS00oAYjE0Ef";

            ChargeCreateParams params =
                    ChargeCreateParams.builder()
                            .setAmount((long) (createPayment.getPrice()*100L))
                            .setCurrency("EUR")
                            .setDescription(createPayment.getDescription())
                            .setSource(createPayment.getStripeToken())
                            .build();

            Charge orderCharge = Charge.create(params);
            if (orderCharge.getStatus().equals("succeeded")){
                response = new CreditCardPaymentResponse();
                response.setStatus(orderCharge.getStatus());
                response.setAmount(createPayment.getPrice());
                response.setPaymentID(orderCharge.getId());

                // Save Order details to DB

                OrderDto orderDto = new OrderDto();
                orderDto.setPrice(response.getAmount());
                orderDto.setMethod("CCD");
                orderDto.setCurrency(orderCharge.getCurrency());
                orderDto.setDescription(orderCharge.getDescription());
                orderDto.setIntent(orderCharge.getPaymentIntent());

                orderDto.setUserID(createPayment.getUserID());
                orderDto.setProductID(createPayment.getProductID());

               // orderDto.setPaymentID(orderCharge.get);
//                orderDto.setPayer_id( response.getPayer_id());
                  orderDto.setPayeeName(orderCharge.getReceiptEmail());
               orderDto.setPaymentDate(orderCharge.getReceiptEmail());
               orderDto.setPayerEmail(orderCharge.getBillingDetails().getName());
//
                orderService.saveOrderDetails(orderDto);

                return response;
            }

        }catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        return response;
    }
}
