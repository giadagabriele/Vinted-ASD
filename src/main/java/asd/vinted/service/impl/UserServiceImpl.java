package asd.vinted.service.impl;

import asd.vinted.dao.UserDao;
import asd.vinted.entity.User;
import asd.vinted.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public User saveUser(User u) {
        return userDao.save(u);
    }
    @Override
    public User findById(String mail, String pass) {
        return userDao.findById(1);
    }
}
