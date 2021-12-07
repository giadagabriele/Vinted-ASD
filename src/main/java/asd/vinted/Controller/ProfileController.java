package asd.vinted.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.service.UserInformationService;

@RestController
@RequestMapping(value = "/userProfile")
@CrossOrigin(origins ="http://localhost:4200")
public class ProfileController {
    @Autowired
    private UserInformationService userInformationService;
}
