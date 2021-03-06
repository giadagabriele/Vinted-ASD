package asd.vinted.data.entity;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name="city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String postalCode;


    @OneToMany(mappedBy = "city")
    private List<User> users;

    @ManyToOne
    @JoinColumn(name="countryId" , referencedColumnName = "id")
    private Country country;

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

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }



}
