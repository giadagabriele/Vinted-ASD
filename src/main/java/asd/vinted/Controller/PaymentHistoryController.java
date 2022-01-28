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
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.data.dto.PaymentHistoryDto;
import asd.vinted.data.service.PaymentHistoryService;
import java.util.List;

@RestController
@RequestMapping("/") //the root path for products
@CrossOrigin(origins ="http://localhost:4200")
public class PaymentHistoryController {

  @Autowired
  private PaymentHistoryService paymentHistoryService;

  @GetMapping("paymenthistory")
  public ResponseEntity<List<PaymentHistoryDto>> all() {
    return ResponseEntity.ok(paymentHistoryService.getPaymentHistory());
  }

  @GetMapping("paymenthistory/{product}")
  public ResponseEntity<List<PaymentHistoryDto>> all(@PathVariable("product") String product) {
    List<PaymentHistoryDto> paymentHistory=paymentHistoryService.getPaymentHistoryByProduct(product);
    return ResponseEntity.ok(paymentHistory);
  }

  @GetMapping("paymenthistory/user/{user}")
  public ResponseEntity<List<PaymentHistoryDto>> all(@PathVariable("user") long user) {
    List<PaymentHistoryDto> paymentHistory=paymentHistoryService.getPaymentHistoryByUser(user);
    return ResponseEntity.ok(paymentHistory);
  }

  @PostMapping("paymenthistory")
  public ResponseEntity<PaymentHistoryDto> add(@RequestBody PaymentHistoryDto history) {
    PaymentHistoryDto p = paymentHistoryService.addPaymentHistory(history);
    return ResponseEntity.ok(p);
  }

  @DeleteMapping("paymenthistory/{id}")
  public HttpStatus delete(@PathVariable Long id) {
    paymentHistoryService.delete(id);
    return HttpStatus.OK;
  }


}