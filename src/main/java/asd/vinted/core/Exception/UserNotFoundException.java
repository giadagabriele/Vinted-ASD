
package asd.vinted.core.Exception;

public class UserNotFoundException extends UserException {
  public UserNotFoundException(Long id) {
    super(String.format("User with ID [%s] not found", id));
  }

  public UserNotFoundException(String name) {
    super(String.format("User with name [%s] not found", name));
  }
}
