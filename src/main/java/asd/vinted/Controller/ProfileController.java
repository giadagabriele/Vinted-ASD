package asd.vinted.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.data.dao.UserDao;
import asd.vinted.data.dto.ProfileDetailsDto;
import asd.vinted.data.dto.ProfileSettingsDto;
import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;
import asd.vinted.data.service.UserInformationService;
import asd.vinted.data.service.UserService;

@RestController
@RequestMapping(value = "/")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {
    @Autowired
    private UserService userService;

    // @Autowired
    // private UserInformationService userInformationService;

    @GetMapping(value = "profile/{id}")
    public ResponseEntity<UserDto> getProfile(@PathVariable("id") long id) {
        UserDto userProfile = userService.getUserById(id);

        if (userProfile != null)
            return ResponseEntity.ok(userProfile);
        return ResponseEntity.ok(userProfile);
    }

    @GetMapping(value = "profileDetaile/{id}")
    public ResponseEntity<ProfileDetailsDto> profileDetaile(@PathVariable("id") long id) {

        UserDto _user = userService.getUserById(id);

        ProfileDetailsDto userProfile = new ProfileDetailsDto();

        if (_user != null) {
            userProfile = userService.getUserDetails(_user.getId());
            if (userProfile != null)
                return ResponseEntity.ok(userProfile);
        }

        return ResponseEntity.ok(userProfile);
    }

    @PostMapping("updateProfileDetail")
    public ResponseEntity<Boolean> updateProfileDetail(@RequestBody ProfileDetailsDto profileDetail) {

        if (userService.updateUserDetails(profileDetail))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    @GetMapping(value = "profileSettings/{id}")
    public ResponseEntity<ProfileSettingsDto> profileSettings(@PathVariable("id") long id) {

        ProfileSettingsDto userSettings = new ProfileSettingsDto();

        userSettings = userService.getProfileSettings(id);

        if (userSettings != null)
            return ResponseEntity.ok(userSettings);

        return ResponseEntity.ok(userSettings);
    }

    
    @PutMapping("updateProfileSettings")
    public ResponseEntity<Boolean> updateProfileSettings(@RequestBody ProfileSettingsDto profileSettings) {

        if (userService.updateUserProfileSettings(profileSettings))
            return ResponseEntity.ok(true);

        return ResponseEntity.ok(false);
    }
}
