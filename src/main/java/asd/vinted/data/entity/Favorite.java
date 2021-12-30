package asd.vinted.data.entity;

import java.util.Objects;

import javax.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long userId;
    private long productId;
    private String image;

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return this.userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getProductId() {
        return this.productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    // @ManyToOne
    // @JoinColumn(name="user" , referencedColumnName = "id")

    // @ManyToOne
    // @JoinColumn(name="products" , referencedColumnName = "id")
    @Override
    public boolean equals(Object o) {

        if (this == o)
            return true;
        if (!(o instanceof Product))
            return false;
        Favorite favorite = (Favorite) o;
        return Objects.equals(this.id, favorite.id) && Objects.equals(this.userId, favorite.userId) && Objects
                .equals(this.productId, favorite.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.productId, this.userId);
    }

}
