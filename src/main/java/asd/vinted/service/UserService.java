package asd.vinted.service;

import asd.vinted.entity.User;
import asd.vinted.util.UserAlreadyExistAuthenticationException;

public interface UserService {

    String saveUser(User u) ;
    User findByEmailAndPassword(String email, String Password);
}
