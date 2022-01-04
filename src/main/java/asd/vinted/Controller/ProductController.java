package asd.vinted.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.data.dto.ProductDto;
import asd.vinted.data.entity.Product;
import asd.vinted.data.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/") //the root path for products
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping("products")
  public ResponseEntity<List<ProductDto>> all() {
    return ResponseEntity.ok(productService.getAllProducts());
  }

  // @GetMapping("/product/name")
  // public ResponseEntity<ProductDto> test(@RequestParam("name") String name) {
  //   return ResponseEntity.ok(productService.getProductByName(name) );
  // }

  @GetMapping("product/{id}")
  public ResponseEntity<ProductDto> all(@PathVariable("id") Long id) {
    ProductDto product = productService.getProduct(id);
    return ResponseEntity.ok(product);
  }

  @PostMapping("product")
  public ResponseEntity<ProductDto> add(@RequestBody ProductDto product) {
    ProductDto p = productService.addProduct(product);
    return ResponseEntity.ok(p);
  }

  // @PutMapping("/product/{id}")
  // public ResponseEntity<ProductDto> update(@PathVariable Long id,
  //     @RequestBody ProductDto product) {
  //   ProductDto p = productService.updateProduct(id, product);
  //   return ResponseEntity.ok(p);
  // }
  @PutMapping("product/{id}")
  public ResponseEntity<Product> update(@PathVariable Long id,
      @RequestBody ProductDto product) {
    Product p = productService.updateProduct(id, product);
    return ResponseEntity.ok(p);
  }


  @DeleteMapping("product/{id}")
  public HttpStatus delete(@PathVariable Long id) {
    productService.delete(id);
    return HttpStatus.OK;
  }
}