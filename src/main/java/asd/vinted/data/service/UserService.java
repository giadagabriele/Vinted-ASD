package asd.vinted.data.service;
import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.ProfileDetails;
import asd.vinted.data.entity.ProfileSettings;
import asd.vinted.data.entity.User;

public interface UserService  {

    String saveUser(User u) ;
   // User findByEmailAndPassword(String email, String Password);
    UserDto findByEmailAndPassword(String email, String Password);
    User getUserByEmail(String email);
    User getUserById(int id);
    UserDto findByEmail(String email);
    ProfileDetails getUserDetails(int id);
    boolean updateUserDetails(ProfileDetails profileDetail);
    ProfileSettings getProfileSettings(int id);
    boolean updateUserProfileSettings(ProfileSettings userProfiles);
}
