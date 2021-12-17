package asd.vinted.data.entity;

import javax.persistence.*;
import java.util.Objects;
import java.util.Optional;
import java.sql.Date;

@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String description;
    private String image;
    private String size;
    private Double price;
    private String brand;
    private String color;
    private int quantity;
    private String category;
    private Date uploadTime;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    public String getCategory() {
        return this.category;
    }
    public void getCategory(String category) {
        this.category = category;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSize() {
        return this.size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getBrand() {
        return this.brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getUploadTime() {
        return this.uploadTime;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    @ManyToOne
    @JoinColumn(name="subcategoryId" , referencedColumnName = "id")
    private SubCategory subCategory;

  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;
    if (!(o instanceof Product))
      return false;
    Product product = (Product) o;
    return Objects.equals(this.id, product.id) && Objects.equals(this.name, product.name) && Objects
        .equals(this.brand, product.brand);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.name, this.brand);
  }

}
