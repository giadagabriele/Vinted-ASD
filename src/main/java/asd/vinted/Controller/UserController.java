package asd.vinted.Controller;

import asd.vinted.entity.User;
import asd.vinted.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins ="http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/registration")
    public ResponseEntity<Boolean> saveUser(@RequestBody User user){

        System.out.println(user);
        userService.saveUser(user);
        return ResponseEntity.ok(true);

    }
    @PostMapping(value = "/login")
    public ResponseEntity<Boolean> loginUser(@RequestBody String username,String password){

            if(username.equals("user") && password.equals("user"))
                return ResponseEntity.ok(true);
            return ResponseEntity.ok(false);



    }
}
