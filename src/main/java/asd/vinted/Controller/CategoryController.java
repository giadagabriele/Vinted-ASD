package asd.vinted.Controller;


import asd.vinted.data.entity.Category;
import asd.vinted.data.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/category") //the root path for products
@CrossOrigin(origins ="http://localhost:4200")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/getAll")
    @CrossOrigin(origins ="http://localhost:4200")
    public ResponseEntity<List<Category>> all() {
        return ResponseEntity.ok(categoryService.getAll());
    }



}
