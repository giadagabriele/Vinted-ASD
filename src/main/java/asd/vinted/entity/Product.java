package asd.vinted.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String description;
    private String pics;
    private String size;
    private Double price;
    private String brand;
    private String color;
    private int quantity;
    private Date uploadTime;

    @ManyToOne
    @JoinColumn(name="subcategoryId" , referencedColumnName = "id")
    private SubCategory subCategory;

}
