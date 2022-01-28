package asd.vinted.data.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

    public boolean isFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public enum Gender {
        Male,
        Female,
        Other;
    }

    @OneToMany(mappedBy = "user")
    private List<Product> products;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String address;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String username;
    @Column
    private boolean firstLogin=true;
    @Column
    private String phoneNumber;

    @Column
    private Date birthDate;
    @Column
    private String profilePic;
    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column()
    private boolean showCityInProfile;

    @ManyToOne
    @JoinColumn(name = "cityId", referencedColumnName = "id")
    public City city;

    @OneToOne
    @JoinColumn(name = "userInformationId", referencedColumnName = "id")
    private UserInformation userInformation;

    // @OneToMany(mappedBy = "user")
    // private List<Favorite>favorites;

    // @OneToMany(mappedBy = "user")
    // private List<Message>messages;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstname) {
        this.firstName = firstname;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getBirthDate() {
        return this.birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getProfilePic() {
        return this.profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public Gender getGender() {
        return this.gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public boolean isShowCityInProfile() {
        return this.showCityInProfile;
    }

    public boolean getShowCityInProfile() {
        return this.showCityInProfile;
    }

    public void setShowCityInProfile(boolean showCityInProfile) {
        this.showCityInProfile = showCityInProfile;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public City getCity() {
        return this.city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public UserInformation getUserInformation() {
        return this.userInformation;
    }

    public void setUserInformation(UserInformation userInformation) {
        this.userInformation = userInformation;
    }

    // public List<Favorite> getFavorites() {
    //     return favorites;
    // }

    // public void setFavorites(List<Favorite> favorites) {
    //     this.favorites = favorites;
    // }

    // public List<Message> getMessages() {
    //     return messages;
    // }

    // public void setMessages(List<Message> messages) {
    //     this.messages = messages;
    // }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", username='" + username + '\'' +
                ", firstLogin=" + firstLogin +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", birthDate=" + birthDate +
                ", profilePic='" + profilePic + '\'' +
                ", gender=" + gender +
                ", showCityInProfile=" + showCityInProfile +
                ", city=" + city +
                ", userInformation=" + userInformation +
                '}';
    }
}
