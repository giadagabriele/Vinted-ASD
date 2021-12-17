package asd.vinted.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.data.dao.UserDao;
import asd.vinted.data.entity.ProfileDetails;
import asd.vinted.data.entity.ProfileSettings;
import asd.vinted.data.entity.User;
import asd.vinted.data.service.UserInformationService;
import asd.vinted.data.service.UserService;

@RestController
@RequestMapping(value = "/userprofile")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserInformationService userInformationService;

    @PostMapping(value = "/profile")
    public ResponseEntity<User> getProfile(@RequestBody User user) {

        User userProfile = userService.getUserByEmail(user.getEmail());

        if (userProfile != null)
            return ResponseEntity.ok(userProfile);

        return ResponseEntity.ok(userProfile);
    }

    @PostMapping(value = "/profileDetaile")
    public ResponseEntity<ProfileDetails> profileDetaile(@RequestBody User user) {

        User _user = userService.getUserByEmail(user.getEmail());

        asd.vinted.data.entity.ProfileDetails userProfile = new asd.vinted.data.entity.ProfileDetails();

        if (_user != null) {
            userProfile = userService.getUserDetails((int) _user.getId());
            if (userProfile != null)
                return ResponseEntity.ok(userProfile);
        }

        return ResponseEntity.ok(userProfile);
    }

    @PostMapping(value = "/updateProfileDetail")
    public ResponseEntity<Boolean> updateProfileDetail(@RequestBody ProfileDetails profileDetail) {

        if (userService.updateUserDetails(profileDetail))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    @PostMapping(value = "/profileSettings")
    public ResponseEntity<ProfileSettings> profileSettings(@RequestBody int id) {

        ProfileSettings userSettings = new ProfileSettings();

        userSettings = userService.getProfileSettings(id);

        if (userSettings != null)
            return ResponseEntity.ok(userSettings);

        return ResponseEntity.ok(userSettings);
    }

    @PostMapping(value = "/updateProfileSettings")
    public ResponseEntity<Boolean> updateProfileSettings(@RequestBody ProfileSettings profileSettings) {

        if (userService.updateUserProfileSettings(profileSettings))
            return ResponseEntity.ok(true);

        return ResponseEntity.ok(false);
    }
}
