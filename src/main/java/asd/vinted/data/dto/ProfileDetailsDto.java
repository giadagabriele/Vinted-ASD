package asd.vinted.data.dto;

public class ProfileDetailsDto {
    private long userId;
    private String profilePic;
    private boolean showCityInProfile;
    private String country;
    private String city;
    private String motherTongue;
    private String userInformation;


    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProfilePic() {
        return this.profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
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

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getMotherTongue() {
        return this.motherTongue;
    }

    public void setMotherTongue(String motherTongue) {
        this.motherTongue = motherTongue;
    }

    public String getUserInformation() {
        return this.userInformation;
    }

    public void setUserInformation(String userInformation) {
        this.userInformation = userInformation;
    }


    @Override
    public String toString() {
        return "{" +
            " userId='" + getUserId() + "'" +
            ", profilePic='" + getProfilePic() + "'" +
            ", showCityInProfile='" + isShowCityInProfile() + "'" +
            ", country='" + getCountry() + "'" +
            ", city='" + getCity() + "'" +
            ", motherTongue='" + getMotherTongue() + "'" +
            ", userInformation='" + getUserInformation() + "'" +
            "}";
    }
    
}
