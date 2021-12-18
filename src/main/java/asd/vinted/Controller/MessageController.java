package asd.vinted.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.data.dto.MessageDto;
import asd.vinted.data.service.MessageService;

import java.util.List;

@RestController
@RequestMapping("/message") //the root path for products
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class MessageController {

  @Autowired
  private MessageService messageService;

  @GetMapping("/message")
  public ResponseEntity<List<MessageDto>> all() {
    return ResponseEntity.ok(messageService.getAllMessages());
  }

  @GetMapping("/message/{id}")
  public ResponseEntity<MessageDto> all(@PathVariable("id") Long id) {
    MessageDto message = messageService.getMessage(id);
    return ResponseEntity.ok(message);
  }

  @PostMapping("/message")
  public ResponseEntity<MessageDto> add(@RequestBody MessageDto Message) {
    MessageDto p = messageService.addMessage(Message);
    return ResponseEntity.ok(p);
  }

  @DeleteMapping("/message/{id}")
  public HttpStatus delete(@PathVariable Long id) {
    messageService.delete(id);
    return HttpStatus.OK;
  }
}
