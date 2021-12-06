package asd.vinted.service.impl;

import asd.vinted.dao.UserDao;
import asd.vinted.entity.User;
import asd.vinted.service.UserService;
import asd.vinted.util.UserAlreadyExistAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User findByEmailAndPassword(String mail, String pass) {
        return
                userDao.findByEmailAndPassword(mail,pass);
    }
    @Override
    public String saveUser(User u) {
        if (emailExist(u.getEmail())) {
                return "email Error";

        }

        if (usernameExist(u.getUsername())) {
            return  "username Error";
        }

        User user= userDao.save(u);
        if(user!=null){
            return"success";
        }
        else
        return  "Error";
    }


    private boolean emailExist(String email) {
        return userDao.findByEmail(email) != null;
    }
    private boolean usernameExist(String username) {
        return userDao.existsByUsernameEqualsIgnoreCase(username);
    }

}
