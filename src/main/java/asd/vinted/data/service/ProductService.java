
package asd.vinted.data.service;
import java.util.List;
import asd.vinted.data.dto.ProductDto;
import asd.vinted.data.entity.Product;

public interface ProductService {
   List<ProductDto> getProductByCategory(String category);
    List<ProductDto> getAllProducts();
    ProductDto getProduct(Long id);
    ProductDto addProduct(ProductDto product);
    Product updateProduct(Long id, ProductDto product);
    void delete(Long id);

}