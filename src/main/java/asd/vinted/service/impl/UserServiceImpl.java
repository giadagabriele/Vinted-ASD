package asd.vinted.service.impl;

import asd.vinted.dao.UserDao;
import asd.vinted.dao.UserInformationDao;
import asd.vinted.entity.ProfileDetails;
import asd.vinted.entity.ProfileSettings;
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
            // profileDetails.setCity(user);
            profileDetails.setShowCityInProfile(user.getShowCityInProfile());
            // profileDetails.setMotherTongue(user.getMotherTongue());
            if (userInf != null)
                profileDetails.setUserInformation(userInf.getInformation());
            return profileDetails;
        }
        return null;
    }

    @Override
    public boolean updateUserDetails(ProfileDetails userdetails) {

        try {
            User user = new User();
            user.setId(userdetails.getUserId());
            user.setProfilePic(userdetails.getProfilePic());
            user.setShowCityInProfile(userdetails.getShowCityInProfile());
            // user.setCity(userdetails.getCity());

            // update user details
            userDao.save(user);

            UserInformation userInformation = new UserInformation();
            // get user information by Id first
            userInformation = userInfoDao.findByUserId(user.getId());
            if (userInformation.getInformation() != null || !userInformation.getInformation().isEmpty())
                userInformation
                        .setInformation(userInformation.getInformation() + "," + userdetails.getUserInformation());
            else
                userInformation.setInformation(userdetails.getUserInformation());

            // updatee user information
            userInfoDao.save(userInformation);

            return true;

        } catch (Exception exc) {
            return false;
        }

    }

    @Override
    public boolean updateUserProfileSettings(ProfileSettings userProfiles) {

        try {

            User user = new User();
            user.setId(userProfiles.getUserId());
            user.setProfilePic(userProfiles.getEmail());
            user.setPhoneNumber(userProfiles.getPhoneNumber());
            user.setFirstname(userProfiles.getFirstName());
            user.setLastName(userProfiles.getLastName());
            user.setBirthDate(userProfiles.getDateOfBirth());
            
            // user.setGender(userProfiles.getGender());
            // user.setCity(userdetails.getCity());
            userDao.save(user);

            return true;

        } catch (Exception exc) {
            return false;
        }
    }

}
