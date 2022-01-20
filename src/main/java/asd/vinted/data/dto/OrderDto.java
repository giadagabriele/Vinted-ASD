package asd.vinted.data.dto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

public class OrderDto {
    private Long id;
    private double price;
    private String currency;
    private String method;
    private String description;
    private String intent;
    private String cancelURL;
    private String successURL;
    private String stripeToken;
    private String stripeEmail;
    private String  paymentID;
    private String  PaymentDate;
    private String  payeeName;
    private String  paymentMode;
    private String  payerName;
    private String  addressLine1;
    private String  city;
    private String  countryCode;
    private String  postalCode;
    private String  state;
    private String  payerEmail;
    private String  payer_id;


    public String getCancelURL() {
        return cancelURL;
    }

    public void setCancelURL(String cancelURL) {
        this.cancelURL = cancelURL;
    }

    public String getSuccessURL() {
        return successURL;
    }

    public void setSuccessURL(String successURL) {
        this.successURL = successURL;
    }

    public OrderDto() {
    }

    public OrderDto(Long id, double price, String currency, String method, String description, String intent) {
        this.id = id;
        this.price = price;
        this.currency = currency;
        this.method = method;
        this.description = description;
        this.intent = intent;
    }

    public Long getId() {return id;}public void setId(Long id) {this.id = id;}

    public double getPrice() {return price;}

    public void setPrice(double price) {this.price = price;}

    public String getCurrency() {return currency;}

    public void setCurrency(String currency) {this.currency = currency;}

    public String getMethod() {return method;}

    public void setMethod(String method) {this.method = method;}

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public String getIntent() {return intent;}public void setIntent(String intent) {this.intent = intent;}

    public String getStripeToken() {
        return stripeToken;
    }

    public void setStripeToken(String stripeToken) {
        this.stripeToken = stripeToken;
    }

    public String getStripeEmail() {
        return stripeEmail;
    }

    public void setStripeEmail(String stripeEmail) {
        this.stripeEmail = stripeEmail;
    }

    public String getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(String paymentID) {
        this.paymentID = paymentID;
    }

    public String getPaymentDate() {
        return PaymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        PaymentDate = paymentDate;
    }

    public String getPayeeName() {
        return payeeName;
    }

    public void setPayeeName(String payeeName) {
        this.payeeName = payeeName;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getPayerName() {
        return payerName;
    }

    public void setPayerName(String payerName) {
        this.payerName = payerName;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPayerEmail() {
        return payerEmail;
    }

    public void setPayerEmail(String payerEmail) {
        this.payerEmail = payerEmail;
    }

    public String getPayer_id() {
        return payer_id;
    }

    public void setPayer_id(String payer_id) {
        this.payer_id = payer_id;
    }
}
