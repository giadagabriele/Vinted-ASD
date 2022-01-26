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

import asd.vinted.data.dto.ReportDto;
import asd.vinted.data.entity.Report;
import asd.vinted.data.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/") //the root path for products
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class ReportController {

  @Autowired
  private ReportService reportService;

  @GetMapping("report")
  public ResponseEntity<Object> all() {
    return ResponseEntity.ok(reportService.getAllReport());
  }

  @GetMapping("report/{id}")
  public ResponseEntity<List<ReportDto>> all(@PathVariable("id") String id) {
    // reportDto report = reportService.getreport(id);
    return ResponseEntity.ok(reportService.getReport(id));
  }

  @PostMapping("report")
  public ResponseEntity<ReportDto> add(@RequestBody ReportDto Report) {
    ReportDto r = reportService.addReport(Report);
    return ResponseEntity.ok(r);
  }

  @DeleteMapping("report/{id}")
  public HttpStatus delete(@PathVariable Long id) {
    reportService.delete(id);
    return HttpStatus.OK;
  }
}
