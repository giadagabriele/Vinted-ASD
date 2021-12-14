package asd.vinted.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "user")
public class User {

    public enum Gender {
        Male,
        Female,
        Other;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String firstname;
    @Column
    private String lastName;
    @Column
    private String address;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String userName;

    @Column
    private String phoneNumber;

    @Column
    private Date birthDate;
    @Column
    private String profilePic;
    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column
    private boolean showCityInProfile;

    @ManyToOne
    @JoinColumn(name = "cityId", referencedColumnName = "id")
    private City city;

    @OneToOne
    @JoinColumn(name = "userInformationId", referencedColumnName = "id")
    private UserInformation userInformation;
    

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
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

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", address='" + getAddress() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", userName='" + getUserName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", profilePic='" + getProfilePic() + "'" +
            ", gender='" + getGender() + "'" +
            ", showCityInProfile='" + isShowCityInProfile() + "'" +
            ", city='" + getCity() + "'" +
            ", userInformation='" + getUserInformation() + "'" +
            "}";
    }
 




}
