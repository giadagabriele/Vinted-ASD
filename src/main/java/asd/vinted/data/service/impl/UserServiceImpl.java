package asd.vinted.data.service.impl;

import asd.vinted.core.Exception.UserException;
import asd.vinted.core.Exception.UserNotFoundException;
import asd.vinted.data.dao.UserDao;
import asd.vinted.data.dao.UserInformationDao;
import asd.vinted.data.dto.ProfileDetailsDto;
import asd.vinted.data.dto.ProfileSettingsDto;
import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;
import asd.vinted.data.entity.UserInformation;
import asd.vinted.data.service.UserService;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserInformationDao userInfoDao;

    @Override
    public User findByEmailAndPassword(String mail, String pass) {
        User user = userDao.findByEmailAndPassword(mail, pass);
        if (user != null)
            return modelMapper.map(user, User.class);
        else
            return null;
    }

    @Override
    public User findByEmail(String email) {
        UserDto user = userDao.findByEmail(email);
        if (user != null)
            return modelMapper.map(user, User.class);
        return null;
    }

    @Override
    public String saveUser(User u) {
        if (emailExist(u.getEmail())) {
            return "Email Address is Already Registered";

        }

        if (usernameExist(u.getUsername())) {
            return "Username is already taken";
        }

        User user = userDao.save(u);
        if (user != null) {
            return "Congratulations, your account has been successfully created.";
        } else
            return "Error";
    }

    private boolean emailExist(String email) {
        return userDao.findByEmail(email) != null;
    }

    private boolean usernameExist(String username) {
        return userDao.existsByUsernameEqualsIgnoreCase(username);
    }

    @Override
    public UserDto getUserById(long id) {

        User user = userDao.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public ProfileDetailsDto getUserDetails(long id) {

        User user = userDao.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        UserInformation userInf = userInfoDao.findByUserId(id);

        ProfileDetailsDto profileDetails = new ProfileDetailsDto();
        if (user != null) {
            profileDetails.setProfilePic(user.getProfilePic());
            profileDetails.setShowCityInProfile(user.getShowCityInProfile());

            // profileDetails.setCity(user.getCity().getName());
            // if (userInf != null)
            // profileDetails.setUserInformation(userInf.getInformation());

            return profileDetails;
        }
        return null;
    }

    @Override
    public ProfileSettingsDto getProfileSettings(long id) {

        User user = userDao.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        ProfileSettingsDto profileSettings = new ProfileSettingsDto();
        if (user != null) {
            profileSettings.setProfilePic(user.getProfilePic());
          //  profileSettings.setCity(user.getCity().getName());
            profileSettings.setEmail(user.getEmail());
            profileSettings.setPhoneNumber(user.getPhoneNumber());
            profileSettings.setFirstName(user.getFirstname());
            profileSettings.setLastName(user.getLastName());

            System.out.println("profile Settings"+profileSettings);
            
            return profileSettings;
        }
        return null;
    }
    @Override
    public boolean updateUserDetails(ProfileDetailsDto profileDetail) {
        try {
            User user = new User();
            user.setId(profileDetail.getUserId());
            user.setProfilePic(profileDetail.getProfilePic());
            user.setShowCityInProfile(profileDetail.getShowCityInProfile());

            // City information should be updated
            // user.setCity(userdetails.getCity());

            // update user details
            userDao.save(user);

            UserInformation userInformation = new UserInformation();
            // get user information by Id first
            userInformation = userInfoDao.findByUserId(user.getId());
            if (userInformation.getInformation() != null || !userInformation.getInformation().isEmpty())
                userInformation
                        .setInformation(userInformation.getInformation() + "," + profileDetail.getUserInformation());
            else
                userInformation.setInformation(profileDetail.getUserInformation());

            // updatee user information
            userInfoDao.save(userInformation);

            return true;

        } catch (Exception exc) {
            return false;
        }
    }

    @Override
    public boolean updateUserProfileSettings(ProfileSettingsDto userProfiles) {
        try {

            User user = new User();
            user.setId(userProfiles.getUserId());
            user.setProfilePic(userProfiles.getEmail());
            user.setPhoneNumber(userProfiles.getPhoneNumber());
            user.setFirstname(userProfiles.getFirstName());
            user.setLastName(userProfiles.getLastName());
            user.setBirthDate(userProfiles.getDateOfBirth());

            // user.setGender(userProfiles.getGender());
            // City info should be updated
            // user.city.setCity(userProfiles.getCity());

            userDao.save(user);

            return true;

        } catch (Exception exc) {
            return false;
        }
        //return new ProfileSettingsDto();
    }
}
