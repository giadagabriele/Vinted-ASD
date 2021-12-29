package asd.vinted.data.entity;

import javax.persistence.*;

@Entity(name = "ORDER")
public class payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "PRICE", nullable = false)
    private double price;

    @Column(name = "CURRENCY", nullable = false)
    private String currency;

    @Column(name = "METHOD", nullable = false)
    private String method;

    @Column(name = "DESCRIPTION")
    private String description;

}
