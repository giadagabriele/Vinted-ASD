package asd.vinted.data.service;
import asd.vinted.data.dto.ProfileDetailsDto;
import asd.vinted.data.dto.ProfileSettingsDto;
import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;

import java.util.List;

public interface UserService {

    String saveUser(User u);
    String updateUser(User u);
    // User findByEmailAndPassword(String email, String Password);
    UserDto findByEmailAndPassword(String email, String Password);
    List<UserDto> findAll();
    UserDto getUserById (long id);

    UserDto findByEmail(String email);

    ProfileDetailsDto getUserDetails(long id);

    boolean updateUserDetails(ProfileDetailsDto profileDetail);

    ProfileSettingsDto getProfileSettings(long id);

    boolean updateUserProfileSettings(ProfileSettingsDto userProfiles);

    String deleteUser(long id);
}
