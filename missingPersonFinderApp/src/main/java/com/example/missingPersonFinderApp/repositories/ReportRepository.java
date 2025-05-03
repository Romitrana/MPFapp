package com.example.missingPersonFinderApp.repositories;

import com.example.missingPersonFinderApp.models.Report;
import com.example.missingPersonFinderApp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReportRepository extends MongoRepository<Report, String> {
    List<Report> findByReportedBy(User user);
    List<Report> findByStatus(Report.ReportStatus status);
}