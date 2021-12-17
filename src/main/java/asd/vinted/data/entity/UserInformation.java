package asd.vinted.data.entity;
import javax.persistence.*;


@Entity
@Table(name="USERINFORMATION")
public class UserInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String Information;

    @OneToOne
    private User user;
    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInformation() {
        return this.Information;
    }

    public void setInformation(String Information) {
        this.Information = Information;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", Information='" + getInformation() + "'" +
            ", user='" + getUser() + "'" +
            "}";
    }

}
