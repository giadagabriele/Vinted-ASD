package asd.vinted.service;

import asd.vinted.entity.User;

public interface UserService {
    User saveUser(User u);
    User findById(String email, String password);
}
