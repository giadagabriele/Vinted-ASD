package asd.vinted.Controller;

import asd.vinted.data.dto.UserDto;
import asd.vinted.data.entity.User;
import asd.vinted.data.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins ="http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;



    @PostMapping(value = "/registration")
    public ResponseEntity<String> saveUser(@RequestBody User user){
        System.out.println(user);
        user.setShowCityInProfile(false);
        String message= userService.saveUser(user);
        JSONObject json= new JSONObject();
        json.put("message",message);
        return  new ResponseEntity<>(
                message,
                HttpStatus.OK);
    }
    @PostMapping(value = "/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        System.out.println(user);

        String message= userService.updateUser(user);
        JSONObject json= new JSONObject();
        json.put("message",message);
        return  new ResponseEntity<>(
                message,
                HttpStatus.OK);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody User user){
        UserDto userLogin;
            user.setShowCityInProfile(false);
        userLogin=userService.findByEmailAndPassword(user.getEmail(),user.getPassword());
        return ResponseEntity.ok(userLogin);
    }

    @PostMapping (value = "/loginGoogle")
    public ResponseEntity<UserDto> loginUserGoogle(@RequestBody User user){
        System.out.println(user);

        user.setShowCityInProfile(false);

        UserDto userLogin=userService.findByEmail(user.getEmail());
        System.out.println((userLogin));
        return ResponseEntity.ok(userLogin);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<UserDto>> all(){

        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(value = "/getByUsername/{username}")
    public ResponseEntity<UserDto> getUser(@PathVariable String username){

        return ResponseEntity.ok(userService.getUserByUsername(username));
    }



}
