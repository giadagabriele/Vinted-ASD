package asd.vinted.data.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="subcategories")
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;

    @OneToMany(mappedBy = "subCategory")
    private List<Product> products;

    @ManyToOne
    @JoinColumn(name="categoryId" , referencedColumnName = "id")
    private Category category;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
