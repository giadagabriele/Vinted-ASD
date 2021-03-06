package asd.vinted.Controller.handler;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import asd.vinted.core.Exception.ItemNotFoundException;

@ControllerAdvice
public class ItemExceptionAdvice {

  @ResponseBody
  @ExceptionHandler(ItemNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  String ProductNotFoundHandler(ItemNotFoundException e) {
    return e.getMessage();
  }

  @ResponseBody
  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  String ProductNotFoundHandler(Exception e) {
    return "ERROR:happend "+e;
  }

}
