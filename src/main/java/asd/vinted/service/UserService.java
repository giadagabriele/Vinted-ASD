package asd.vinted.service;

import javax.sound.sampled.Line;

import antlr.collections.List;
import asd.vinted.data.entity.ProfileDetails;
import asd.vinted.data.entity.ProfileSettings;
import asd.vinted.data.entity.User;
import asd.vinted.util.UserAlreadyExistAuthenticationException;

public interface UserService  {

    String saveUser(User u) ;
   
    User findByEmailAndPassword(String email, String Password);
    User getUserByEmail(String email);
    User getUserById(int id);
    User findByEmail(String email);
    ProfileDetails getUserDetails(int id);
    boolean updateUserDetails(ProfileDetails userdetails);
    ProfileSettings getProfileSettings(int id);
    boolean updateUserProfileSettings(ProfileSettings userProfiles);
}
