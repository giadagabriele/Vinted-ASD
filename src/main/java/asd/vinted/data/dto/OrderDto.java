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
    @Column
    private String stripeToken;
    @Column
    private String stripeEmail;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderDto orderDto = (OrderDto) o;
        return Double.compare(orderDto.price, price) == 0 && Objects.equals(id, orderDto.id) && Objects.equals(currency, orderDto.currency) && Objects.equals(method, orderDto.method) && Objects.equals(description, orderDto.description) && Objects.equals(intent, orderDto.intent) && Objects.equals(cancelURL, orderDto.cancelURL) && Objects.equals(successURL, orderDto.successURL) && Objects.equals(stripeToken, orderDto.stripeToken) && Objects.equals(stripeEmail, orderDto.stripeEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, price, currency, method, description, intent, cancelURL, successURL, stripeToken, stripeEmail);
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + id +
                ", price=" + price +
                ", currency='" + currency + '\'' +
                ", method='" + method + '\'' +
                ", description='" + description + '\'' +
                ", intent='" + intent + '\'' +
                ", cancelURL='" + cancelURL + '\'' +
                ", successURL='" + successURL + '\'' +
                ", stripeToken='" + stripeToken + '\'' +
                ", stripeEmail='" + stripeEmail + '\'' +
                '}';
    }

}
