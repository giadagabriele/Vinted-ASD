package asd.vinted.data.dto;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;


public class PaymentHistoryDto implements Serializable {
    private long id;
    private long user;
    private String paymentMethod;
    private String description;
    private String product;
    private Double price;
    @CreationTimestamp
    private Timestamp paidTime;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUser() {
        return this.user;
    }

    public void setUser(long user) {
        this.user = user;
    }

    public String getPaymentMethod() {
        return this.paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProduct() {
        return this.product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Timestamp getPaidTime() {
        return this.paidTime;
    }

    public void setPaidTime(Timestamp paidTime) {
        this.paidTime = paidTime;
    }

    public static Object findByProduct(String product2) {
        return null;
    }

}