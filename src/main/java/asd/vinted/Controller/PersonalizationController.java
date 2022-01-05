package asd.vinted.Controller;

import asd.vinted.data.entity.Personalization;
import asd.vinted.data.service.PersonalizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/personalization")
@CrossOrigin(origins ="http://localhost:4200")
public class PersonalizationController {

    @Autowired
    PersonalizationService personalizationService;


    @GetMapping(value = "/getByUserId/{id}")
    public ResponseEntity<List<Personalization>> getPersonalizations(@PathVariable Long id){

        return ResponseEntity.ok(personalizationService.findAllByUserId(id));
    }

    @PostMapping(value = "/save/{id}")
    @CrossOrigin(origins ="http://localhost:4200")
    public ResponseEntity<Boolean> savePersonalizations(@RequestBody List<Personalization> personalizations, @PathVariable Long id){
        System.out.println(id);
        for(Personalization pers: personalizations)
            System.out.println(pers);
        personalizationService.deleteAllByUserId(id);
        return ResponseEntity.ok(personalizationService.save(personalizations));
    }
}
