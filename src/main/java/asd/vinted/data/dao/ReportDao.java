package asd.vinted.data.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import asd.vinted.data.entity.Report;

import java.util.List;

public interface ReportDao extends JpaRepository<Report,Long> {
    Report save(ReportDao r);
    List<Report> findByUser(String user);
}
