package asd.vinted.service;

import javax.sound.sampled.Line;

import antlr.collections.List;
import asd.vinted.entity.ProfileDetails;
import asd.vinted.entity.User;
import asd.vinted.util.UserAlreadyExistAuthenticationException;

public interface UserService {

    String saveUser(User u) ;
    User findByEmailAndPassword(String email, String Password);
    User getUserByEmail(String email);
    User getUserById(int id);
    
    ProfileDetails getUserDetails(int id);
}
