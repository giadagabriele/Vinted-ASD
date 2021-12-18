package asd.vinted.data.service;

import java.util.Optional;

import asd.vinted.data.dto.ProfileDetailsDto;
import asd.vinted.data.dto.ProfileSettingsDto;
import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;

public interface UserService {

    String saveUser(User u);

    // User findByEmailAndPassword(String email, String Password);
    User findByEmailAndPassword(String email, String Password);

    UserDto getUserById (long id);

    User findByEmail(String email);

    ProfileDetailsDto getUserDetails(long id);

    boolean updateUserDetails(ProfileDetailsDto profileDetail);

    ProfileSettingsDto getProfileSettings(long id);

    boolean updateUserProfileSettings(ProfileSettingsDto userProfiles);
}
