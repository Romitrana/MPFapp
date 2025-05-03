package com.example.missingPersonFinderApp.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReportRequest {
    @NotBlank
    private String fullName;
    
    @NotNull
    private int age;
    
    private String gender;
    
    @NotBlank
    private String lastSeenDate;
    
    @NotBlank
    private String lastSeenLocation;
    
    private String description;
    
    private String physicalAttributes;
    
    private String clothingDescription;
    
    private String medicalConditions;
    
    @NotBlank
    private String contactName;
    
    @NotBlank
    private String contactPhone;
    
    @NotBlank
    private String contactEmail;
    
    private String additionalInfo;
}