package asd.vinted.data.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import asd.vinted.core.Exception.ItemNotFoundException;
import asd.vinted.data.dao.ReportDao;
import asd.vinted.data.dto.ReportDto;
import asd.vinted.data.entity.Report;
import asd.vinted.data.service.ReportService;

@Service

public class ReportServiceImpl implements ReportService{

    @Autowired
    private ReportDao reportDao;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ReportDto> getAllReport() {
        List<Report> Report= reportDao.findAll();
        return Report.stream().map(mess->modelMapper.map(mess, ReportDto.class)).collect(Collectors.toList());
    }
    @Override
    public List<ReportDto> getReport(String user) {
      List<Report>  report = reportDao.findByUser(user);
        return report.stream().map(prod->modelMapper.map(prod, ReportDto.class)).collect(Collectors.toList());
    }

    @Override
    public ReportDto addReport(ReportDto dto) {
      Report favorite = modelMapper.map(dto, Report.class);
      Report saved = reportDao.save(favorite);
      return modelMapper.map(saved, ReportDto.class);
    }
    @Override
    public void delete(Long id) {
      reportDao.deleteById(id);
    }

}
