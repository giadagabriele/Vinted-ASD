package asd.vinted.Controller;


import asd.vinted.data.entity.City;
import asd.vinted.data.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/city")
@CrossOrigin(origins ="http://localhost:4200")
public class CityController {

    @Autowired
    CityService cityService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<City>> all(){

        return ResponseEntity.ok(cityService.findAll());
    }
}
