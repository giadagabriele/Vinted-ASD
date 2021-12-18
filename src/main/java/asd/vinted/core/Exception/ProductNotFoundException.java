package asd.vinted.core.Exception;


public class ProductNotFoundException extends ProductException {

  public ProductNotFoundException(Long id) {
    super(String.format("Product [%s] not found", id));
  }

  public ProductNotFoundException(String name) {
    super(String.format("Product with name [%s] not found", name));
  }
}
