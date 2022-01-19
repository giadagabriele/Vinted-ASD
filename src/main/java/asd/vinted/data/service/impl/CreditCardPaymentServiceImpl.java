package asd.vinted.data.service.impl;

import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.payment.CreditCardConfig;
import asd.vinted.data.payment.CreditCardPaymentResponse;
import asd.vinted.data.service.CreditCardPaymentService;
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

    @Override
    public CreditCardPaymentResponse CreatCreditCardPayment(OrderDto createPayment) {

        CreditCardPaymentResponse response = null;
        try {
            //Stripe.apiKey = config.getApiKey();
           Stripe.apiKey = "sk_test_51KJQYrGYh3JcLLFyylP8w7TExdqsgiuPvCHt3LUi5m1ZTpotdGHQZpLLkmddpl1QEOOuE2uXvFkFRfZmE087K7uS00oAYjE0Ef";

            ChargeCreateParams params =
                    ChargeCreateParams.builder()
                            .setAmount((long) (createPayment.getPrice()*100L))
                            .setCurrency("EUR")
                            .setDescription(createPayment.getDescription())
                            .setSource(createPayment.getStripeToken())
                            .build();

            Charge charge = Charge.create(params);
            if (charge.getStatus().equals("succeeded")){
                response = new CreditCardPaymentResponse();
                response.setStatus(charge.getStatus());
                response.setAmount(charge.getAmount()/100);
                response.setPaymentID(charge.getId());
                return response;
            }

        }catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        return response;
    }
}
