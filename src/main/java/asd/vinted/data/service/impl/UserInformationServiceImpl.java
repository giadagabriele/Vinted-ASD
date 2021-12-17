package asd.vinted.data.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import asd.vinted.data.dao.UserDao;
import asd.vinted.data.dao.UserInformationDao;
import asd.vinted.data.entity.User;
import asd.vinted.data.entity.UserInformation;
import asd.vinted.data.service.UserInformationService;

@Service
public class UserInformationServiceImpl implements UserInformationService {
    @Autowired
    private UserInformationDao userInformationDao;

    @Autowired
    private UserDao userDao;

    @Override
    public UserInformation findById(Long id) {

        try {
            UserInformation userInformation = new UserInformation();
            User user = userDao.findById(id).get();

            if (user != null) {
                userInformation = userInformationDao.findByUserId(user.getId());
                return userInformation;
            }
            return null;
        } catch (Exception e) {

        }
        return null;
    }

    @Override
    public boolean updateUserInformation(UserInformation user) {
        try {
            userInformationDao.save(user);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
