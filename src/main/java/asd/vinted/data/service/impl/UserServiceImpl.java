package asd.vinted.data.service.impl;

import asd.vinted.core.Exception.UserNotFoundException;
import asd.vinted.data.dao.UserDao;
import asd.vinted.data.dao.UserInformationDao;
import asd.vinted.data.dto.ProfileDetailsDto;
import asd.vinted.data.dto.ProfileSettingsDto;
import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;
import asd.vinted.data.entity.UserInformation;
import asd.vinted.data.service.UserService;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class UserServiceImpl implements UserService {
    String mailExistsError= "Email Address is Already Registered";
    String usernameExistsError= "Username is already taken";
    String genericErrorMessage="something went wrong please try again later";
    String successMessage= "Congratulations, your account has been successfully created.";

    @Autowired
    private UserDao userDao;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserInformationDao userInfoDao;


    @Override
    public UserDto findByEmailAndPassword(String mail, String pass) {
        String password = Base64.getEncoder().encodeToString(pass.getBytes());
        User user = userDao.findByEmailAndPassword(mail, password);

        if (user != null)
            return modelMapper.map(user, UserDto.class);
        else
            return null;
    }

    @Override
    public UserDto findByEmail(String email) {

        User user = userDao.findByEmail(email);

        if (user != null)
            return modelMapper.map(user, UserDto.class);
        return null;
    }

    @Override
    public String saveUser(User u) {
        if (emailExist(u.getEmail())) {
            return "Email Address is Already Registered";

        }

        if (usernameExist(u.getUsername())) {
            return usernameExistsError;
        }

        if(u.getPassword()!=null) {
            String encodedString = Base64.getEncoder().encodeToString(u.getPassword().getBytes());
            u.setPassword(encodedString);
        }
        User user = userDao.save(u);
        if (user != null) {
            return successMessage;
        } else
            return genericErrorMessage;
    }
    @Override
    public String updateUser(User u) {
        System.out.println(u);

        List<User> users= userDao.findAll();

        for(User user : users){
            System.out.println(user);

            if(user.getId()!=u.getId() && user.getEmail().equalsIgnoreCase(u.getEmail()))
                return mailExistsError;
            if(user.getId()!=u.getId() && user.getUsername().equalsIgnoreCase(u.getUsername()))
                return usernameExistsError;
        }



        User user = userDao.save(u);
        if (user != null) {
            return successMessage;
        } else
            return genericErrorMessage;
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
    public boolean updateUserProfileSettings(ProfileSettingsDto userProfiles) {

        try {

            User user = new User();
            user.setId(userProfiles.getUserId());
            user.setProfilePic(userProfiles.getEmail());
            user.setPhoneNumber(userProfiles.getPhoneNumber());
            user.setFirstName(userProfiles.getFirstName());
            user.setLastName(userProfiles.getLastName());
            user.setBirthDate(userProfiles.getDateOfBirth());

            // user.setGender(userProfiles.getGender());
            // user.setCity(userdetails.getCity());

            userDao.save(user);

            // System.out.println("User saved "+user);

            return true;

        } catch (Exception exc) {
            // System.out.println("Exception happend ");
            return false;
        }
    }

    @Override
    public ProfileDetailsDto getUserDetails(long id) {

        User user = userDao.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        UserInformation userInf = userInfoDao.findByUserId(id);

        ProfileDetailsDto profileDetails = new ProfileDetailsDto();
        if (user != null) {
            profileDetails.setProfilePic(user.getProfilePic());
            profileDetails.setCity(user.getCity().getName());

            // profileDetails.setCity(user.getCity());
            // profileDetails.setShowCityInProfile(user.getShowCityInProfile());

            // profileDetails.setCity(user);
            // profileDetails.setShowCityInProfile(user.getShowCityInProfile());
            // profileDetails.setMotherTongue(user.getMotherTongue());

            if (userInf != null)
                profileDetails.setUserInformation(userInf.getInformation());
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
            // profileSettings.setCity(user.getCity().getName());
            profileSettings.setEmail(user.getEmail());
            profileSettings.setPhoneNumber(user.getPhoneNumber());
            profileSettings.setFirstName(user.getFirstName());
            profileSettings.setLastName(user.getLastName());

            System.out.println("profile Settings" + profileSettings);

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
            // System.out.println("Exception happend in here :");
            return false;
        }
    }

    @Override
    public String deleteUser(long id) {

        try {

            // check if the user have inputed user information and delete it if it have user
            // info
            if (userInfoDao.findByUserId(id) != null)
                userInfoDao.delete(userInfoDao.findByUserId(id));

            // delete user with id : id
            userDao.deleteById(id);

            return "User with Id : " + id + " is removed successfully";

        } catch (Exception exc) {

            return "User cannot be removed  \n Error : " + exc.getMessage();
        }
    }
}
