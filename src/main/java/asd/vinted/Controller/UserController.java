package asd.vinted.Controller;

import asd.vinted.entity.User;
import asd.vinted.service.UserService;
import asd.vinted.util.UserAlreadyExistAuthenticationException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins ="http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/registration")

    public ResponseEntity<String> saveUser(@RequestBody User user){
        String message= userService.saveUser(user);
        System.out.println(message);
        JSONObject json= new JSONObject();
        json.put("message",message);
        return  new ResponseEntity<>(
                message,
                HttpStatus.OK);
    }


    @PostMapping(value = "/login")
    public ResponseEntity<User> loginUser(@RequestBody User user){
        System.out.println(user.getEmail()+user.getPassword());

           User user2= userService.findByEmailAndPassword(user.getEmail(),user.getPassword());
            System.out.println(user2);
            if(user2!=null)
                return ResponseEntity.ok(user2);

            return ResponseEntity.ok(user2);

    }
}
