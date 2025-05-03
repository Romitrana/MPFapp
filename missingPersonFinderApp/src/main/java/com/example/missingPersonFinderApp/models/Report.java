package com.example.missingPersonFinderApp.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Document(collection = "reports")
public class Report {
    @Id
    private String id;
    private String fullName;
    private int age;
    private String gender;
    private LocalDate lastSeenDate;
    private String lastSeenLocation;
    private String description;
    private String physicalAttributes;
    private String clothingDescription;
    private String medicalConditions;
    private String contactName;
    private String contactPhone;
    private String contactEmail;
    private String additionalInfo;
    private ReportStatus status = ReportStatus.MISSING;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @DBRef
    private User reportedBy;
    
    public enum ReportStatus {
        MISSING, FOUND, UNDER_PROCESS
    }
}