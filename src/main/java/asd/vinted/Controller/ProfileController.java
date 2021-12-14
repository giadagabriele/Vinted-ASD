package asd.vinted.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.dao.UserDao;
import asd.vinted.entity.User;
import asd.vinted.service.UserInformationService;
import asd.vinted.service.UserService;

@RestController
@RequestMapping(value = "/userprofile")
@CrossOrigin(origins ="http://localhost:4200")
public class ProfileController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/profile")
    public ResponseEntity<User>getProfile(@RequestBody User user){

           User userProfile= userService.getUserByEmail(user.getEmail());
            
            if(userProfile!=null)
                return ResponseEntity.ok(userProfile);

            return ResponseEntity.ok(userProfile);

    }

    // @PostMapping(value = "/profile")
    // public ResponseEntity<User>getProfile(@RequestBody User user){

    //        User userProfile= userService.getUserByEmail(user.getEmail());
            
    //         if(userProfile!=null)
    //             return ResponseEntity.ok(userProfile);

    //         return ResponseEntity.ok(userProfile);

    // }
    

}
