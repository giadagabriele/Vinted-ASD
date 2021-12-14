package asd.vinted.Controller;

import asd.vinted.dto.UserDto;
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
        System.out.println(user);

        String message= userService.saveUser(user);
        JSONObject json= new JSONObject();
        json.put("message",message);
        return  new ResponseEntity<>(
                message,
                HttpStatus.OK);





    }


    @PostMapping(value = "/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody User user){

        UserDto userLogin=null;
        userLogin=userService.findByEmailAndPassword(user.getEmail(),user.getPassword());
        System.out.println(userLogin);
        return ResponseEntity.ok(userLogin);
    }

    @PostMapping (value = "/loginGoogle")
    public ResponseEntity<UserDto> loginUserGoogle(@RequestBody User user){


        UserDto userLogin=userService.findByEmail(user.getEmail());
        return ResponseEntity.ok(userLogin);
    }
}
