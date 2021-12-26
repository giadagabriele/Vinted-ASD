package asd.vinted.data.dto;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import asd.vinted.data.entity.City;
import asd.vinted.data.entity.UserInformation;

public class UserDto implements Serializable {


    public enum Gender {
        Male,
        Female,
        Other;
    }

    private long id;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String password;
    private String username;
    private String phoneNumber;
    private Date birthDate;
    private String profilePic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private boolean showCityInProfile;
    private boolean firstLogin;

    private City city;
    private UserInformation userInformation;


    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
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

    public void setUsername(String username) {
        this.username = username;
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
    public boolean isFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(boolean firstLogin) {
        this.firstLogin = firstLogin;
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
    
}
