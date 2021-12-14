package asd.vinted.service.impl;

import asd.vinted.dao.UserDao;
import asd.vinted.dao.UserInformationDao;
import asd.vinted.entity.ProfileDetails;
import asd.vinted.entity.User;
import asd.vinted.entity.UserInformation;
import asd.vinted.service.UserService;
import asd.vinted.util.UserAlreadyExistAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private UserInformationDao userInfoDao;

    @Override
    public User findByEmailAndPassword(String mail, String pass) {
        return userDao.findByEmailAndPassword(mail, pass);
    }

    @Override
    public String saveUser(User u) {
        if (emailExist(u.getEmail())) {
            return "email Error";

        }

        if (usernameExist(u.getUserName())) {
            return "username Error";
        }

        User user = userDao.save(u);
        if (user != null) {
            return "success";
        } else
            return "Error";
    }

    private boolean emailExist(String email) {
        return userDao.findByEmail(email) != null;
    }

    private boolean usernameExist(String username) {
        // return userDao.existsByUsernameEqualsIgnoreCase(username);
        return false;
    }

    @Override
    public User getUserByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public User getUserById(int id) {
        return userDao.findById(id);
    }

    @Override
    public ProfileDetails getUserDetails(int id) {
        User user = userDao.findById(id);
        UserInformation userInf = userInfoDao.findById(id);

        ProfileDetails profileDetails = new ProfileDetails();

        if (user != null) {
            profileDetails.setProfilePic(user.getProfilePic());
            // profileDetails.setCity(user.getCity());
            profileDetails.setShowCityInProfile(user.getShowCityInProfile());
            // profileDetails.setMotherTongue(user.getMotherTongue());
            if (userInf != null)
                profileDetails.setUserInformation(userInf.getInformation());
                return profileDetails;
        }
        return null;
    }

}
