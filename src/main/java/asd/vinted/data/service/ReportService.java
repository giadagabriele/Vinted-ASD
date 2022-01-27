
package asd.vinted.data.service;

import java.util.List;

import asd.vinted.data.dto.ReportDto;
import asd.vinted.data.entity.Report;

public interface ReportService {
    List<ReportDto> getAllReport();
    List<ReportDto> getReport(String user);
    ReportDto addReport(ReportDto report);
    void delete(Long id);
}
