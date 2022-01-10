package asd.vinted.data.service.impl;
import asd.vinted.core.Exception.UserNotFoundException;
import asd.vinted.data.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import asd.vinted.core.Exception.ExceptionHandler;
import asd.vinted.core.Exception.ItemNotFoundException;
import asd.vinted.data.dao.ProductDao;
import asd.vinted.data.dto.ProductDto;
import asd.vinted.data.entity.Product;
import asd.vinted.data.service.ProductService;
import org.modelmapper.ModelMapper;

import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

@Autowired
private ProductDao productDao;

@Autowired
private UserDao userDao;

@Autowired
private ModelMapper modelMapper;

@Override
public List<ProductDto> getAllProducts() {
     List<Product> product= productDao.findAll();
    return product.stream().map(prod->modelMapper.map(prod, ProductDto.class)).collect(Collectors.toList());
}

  @Override
  public List<ProductDto> getAllProductsBySeller(long id) {
    //TODO: do it LOL
    return null;
  }

  @Override
public ProductDto getProduct(Long id) {
  Product product = productDao.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
  return modelMapper.map(product, ProductDto.class);
}
@Override
public List<ProductDto> getProductByCategory(String category) {
  List<Product> product = productDao.findByCategory(category);
  return product.stream().map(prod->modelMapper.map(prod, ProductDto.class)).collect(Collectors.toList());
}

@Override
public ProductDto addProduct(ProductDto dto) {
  System.out.println();
  Product product = new Product();
  product = modelMapper.map(dto, Product.class);
  System.out.println("prod = "+ dto.getUserId()) ;
  product.setUser(userDao.findById(dto.getUserId()).orElseThrow(() -> new UserNotFoundException(dto.getUserId())));
  Product saved = ((CrudRepository<Product, Long>) productDao).save(product);
  System.out.println(saved+ "Product");
  return modelMapper.map(saved, ProductDto.class);

}

@Override
public Product updateProduct(Long id, ProductDto product) {
  return productDao.findById(id).map(prod -> {
    prod.setName(product.getName());
    prod.setBrand(product.getBrand());
    return productDao.save(prod);
  }).orElseThrow(() -> new ExceptionHandler());
}

@Override
public void delete(Long id) {
  productDao.deleteById(id);
}

  @Override
  public boolean save(Product product) {
    try {
      productDao.save(product);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return false;
    }
    return  true;
  }

}