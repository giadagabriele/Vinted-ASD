package asd.vinted.data.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "payment")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private double price;

    @Column
    private String currency;

    @Column
    private String method;

    @Column
    private String description;

    @Column
    private String intent;

    public Order() {
    }

    public Order(Long id, double price, String currency, String method, String description, String intent) {
        this.id = id;
        this.price = price;
        this.currency = currency;
        this.method = method;
        this.description = description;
        this.intent = intent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIntent() {
        return intent;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id == order.id && Double.compare(order.price, price) == 0 && Objects.equals(currency, order.currency) && Objects.equals(method, order.method) && Objects.equals(description, order.description) && Objects.equals(intent, order.intent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, price, currency, method, description, intent);
    }
}
