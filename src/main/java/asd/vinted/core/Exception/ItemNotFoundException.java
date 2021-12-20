package asd.vinted.core.Exception;


public class ItemNotFoundException extends ExceptionHandler {

  public ItemNotFoundException(Long id) {
    super(String.format("Product with ID [%s] not found", id));
  }

  public ItemNotFoundException(String name) {
    super(String.format("Product with name [%s] not found", name));
  }
}
