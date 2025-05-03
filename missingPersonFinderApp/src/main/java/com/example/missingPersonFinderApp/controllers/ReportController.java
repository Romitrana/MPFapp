package com.example.missingPersonFinderApp.controllers;

import com.example.missingPersonFinderApp.models.Report;
import com.example.missingPersonFinderApp.models.User;
import com.example.missingPersonFinderApp.payload.request.ReportRequest;
import com.example.missingPersonFinderApp.payload.request.StatusUpdateRequest;
import com.example.missingPersonFinderApp.payload.response.MessageResponse;
import com.example.missingPersonFinderApp.repositories.ReportRepository;
import com.example.missingPersonFinderApp.repositories.UserRepository;
import com.example.missingPersonFinderApp.security.services.UserDetailsImpl;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    ReportRepository reportRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportRepository.findAll();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Report>> getUserReports() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Optional<User> user = userRepository.findById(userDetails.getId());
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Report> reports = reportRepository.findByReportedBy(user.get());
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getReportById(@PathVariable String id) {
        Optional<Report> report = reportRepository.findById(id);
        
        if (report.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Check if user is admin or the owner of the report
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isAdmin && !report.get().getReportedBy().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("You don't have permission to view this report"));
        }
        
        return ResponseEntity.ok(report.get());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createReport(@Valid @RequestBody ReportRequest reportRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Optional<User> user = userRepository.findById(userDetails.getId());
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        
        Report report = new Report();
        report.setFullName(reportRequest.getFullName());
        report.setAge(reportRequest.getAge());
        report.setGender(reportRequest.getGender());
        report.setLastSeenDate(LocalDate.parse(reportRequest.getLastSeenDate()));
        report.setLastSeenLocation(reportRequest.getLastSeenLocation());
        report.setDescription(reportRequest.getDescription());
        report.setPhysicalAttributes(reportRequest.getPhysicalAttributes());
        report.setClothingDescription(reportRequest.getClothingDescription());
        report.setMedicalConditions(reportRequest.getMedicalConditions());
        report.setContactName(reportRequest.getContactName());
        report.setContactPhone(reportRequest.getContactPhone());
        report.setContactEmail(reportRequest.getContactEmail());
        report.setAdditionalInfo(reportRequest.getAdditionalInfo());
        report.setStatus(Report.ReportStatus.MISSING);
        report.setReportedBy(user.get());
        
        reportRepository.save(report);
        
        return ResponseEntity.ok(new MessageResponse("Report created successfully"));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateReportStatus(@PathVariable String id, @Valid @RequestBody StatusUpdateRequest statusRequest) {
        Optional<Report> reportData = reportRepository.findById(id);
        
        if (reportData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Report report = reportData.get();
        try {
            report.setStatus(Report.ReportStatus.valueOf(statusRequest.getStatus()));
            report.setUpdatedAt(LocalDateTime.now());
            
            reportRepository.save(report);
            
            return ResponseEntity.ok(new MessageResponse("Report status updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid status value"));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateReport(@PathVariable String id, @Valid @RequestBody ReportRequest reportRequest) {
        Optional<Report> reportData = reportRepository.findById(id);
        
        if (reportData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Report report = reportData.get();
        
        // Check if user is admin or the owner of the report
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        
        if (!isAdmin && !report.getReportedBy().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("You don't have permission to update this report"));
        }
        
        report.setFullName(reportRequest.getFullName());
        report.setAge(reportRequest.getAge());
        report.setGender(reportRequest.getGender());
        report.setLastSeenDate(LocalDate.parse(reportRequest.getLastSeenDate()));
        report.setLastSeenLocation(reportRequest.getLastSeenLocation());
        report.setDescription(reportRequest.getDescription());
        report.setPhysicalAttributes(reportRequest.getPhysicalAttributes());
        report.setClothingDescription(reportRequest.getClothingDescription());
        report.setMedicalConditions(reportRequest.getMedicalConditions());
        report.setContactName(reportRequest.getContactName());
        report.setContactPhone(reportRequest.getContactPhone());
        report.setContactEmail(reportRequest.getContactEmail());
        report.setAdditionalInfo(reportRequest.getAdditionalInfo());
        report.setUpdatedAt(LocalDateTime.now());
        
        reportRepository.save(report);
        
        return ResponseEntity.ok(new MessageResponse("Report updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteReport(@PathVariable String id) {
        Optional<Report> report = reportRepository.findById(id);
        
        if (report.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        reportRepository.deleteById(id);
        
        return ResponseEntity.ok(new MessageResponse("Report deleted successfully"));
    }
}