package asd.vinted.Controller;
import asd.vinted.data.entity.Personalization;
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
@CrossOrigin(origins ="http://localhost:4200")
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

  @GetMapping("myProducts/{userId}")
  public ResponseEntity<List<ProductDto>> allProductsBySeller(@PathVariable("userId") Long userId) {
    List<ProductDto> products=productService.getAllProductsBySeller(userId);
    return ResponseEntity.ok(products);
  }

  @GetMapping("product/{id}")
  @CrossOrigin(origins ="http://localhost:4200")
  public ResponseEntity<ProductDto> all(@PathVariable("id") Long id) {
    ProductDto product = productService.getProduct(id);
    return ResponseEntity.ok(product);
  }
  @GetMapping("product/category/{category}")
  public ResponseEntity<List<ProductDto>> all(@PathVariable("category") String category) {
    List<ProductDto> products=productService.getProductByCategory(category);
    return ResponseEntity.ok(products);
  }

  @GetMapping("product/category/{category}/sortByAscendingPrice")
  public ResponseEntity<List<ProductDto>> allSortedByAscendingPrice(@PathVariable("category") String category) {
    List<ProductDto> products=productService.getProductByCategory(category);
    products.sort((o1, o2) -> (int) (o1.getPrice()- o2.getPrice()));
    return ResponseEntity.ok(products);
  }

  @GetMapping("product/category/{category}/sortByDescendingPrice")
  public ResponseEntity<List<ProductDto>> allSortedByDescendingPrice(@PathVariable("category") String category) {
    List<ProductDto> products=productService.getProductByCategory(category);
    products.sort((o1, o2) -> (int) (o2.getPrice()- o1.getPrice()));
    return ResponseEntity.ok(products);
  }


  @PostMapping("product/add")
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
  @PutMapping("product/update/{id}")
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