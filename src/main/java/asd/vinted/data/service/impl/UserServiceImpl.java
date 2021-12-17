package asd.vinted.data.service.impl;

import asd.vinted.dao.UserDao;
import asd.vinted.dao.UserInformationDao;
import asd.vinted.dto.UserDto;
import asd.vinted.entity.ProfileDetails;
import asd.vinted.entity.ProfileSettings;
import asd.vinted.entity.User;
import asd.vinted.entity.UserInformation;
import asd.vinted.service.UserService;
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
    public UserDto findByEmailAndPassword(String mail, String pass) {
        User user= userDao.findByEmailAndPassword(mail,pass);
        if(user!=null)
            return modelMapper.map(user, UserDto.class);
        else
            return null;
    }
    @Override
    public UserDto findByEmail(String email) {
        User user= userDao.findByEmail(email);
        if(user !=null)
            return modelMapper.map(user, UserDto.class);
        return null;
    }

    @Override
    public String saveUser(User u) {
        if (emailExist(u.getEmail())) {
            return "Email Address is Already Registered";

        }

        if (usernameExist(u.getUsername())) {
            return  "Username is already taken";
        }

        User user= userDao.save(u);
        if(user!=null){
            return "Congratulations, your account has been successfully created.";
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
           //profileDetails.setShowCityInProfile(user.getShowCityInProfile());

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
    public boolean updateUserDetails(ProfileDetails userdetails) {

        try {
            User user = new User();
            user.setId(userdetails.getUserId());
            user.setProfilePic(userdetails.getProfilePic());
            //user.setShowCityInProfile(userdetails.getShowCityInProfile());
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
            //user.city.setCity(userProfiles.getCity());

            userDao.save(user);

            return true;

        } catch (Exception exc) {
            return false;
        }
    }

}
