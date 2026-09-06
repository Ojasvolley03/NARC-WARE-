package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cases")
public class CaseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String caseNumber; // e.g. CASE-2026-089 or CASE-2026-EXM-001

    private String title;
    
    @Column(length = 2000)
    private String description;

    private String category; // DRUG_TRAFFICKING, EXAM_LEAK

    private String status; // NEW, UNDER_REVIEW, ACTIVE, ESCALATED, CLOSED, ARCHIVED
    private String riskLevel; // LOW, MEDIUM, HIGH
    private int riskScore; // 0 - 100

    private String leadInvestigator;
    private String priority; // HIGH, MEDIUM, LOW

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public CaseModel() {}

    public CaseModel(String caseNumber, String title, String description, String category, String status, String riskLevel, int riskScore, String leadInvestigator, String priority) {
        this.caseNumber = caseNumber;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.riskLevel = riskLevel;
        this.riskScore = riskScore;
        this.leadInvestigator = leadInvestigator;
        this.priority = priority;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
    public String getLeadInvestigator() { return leadInvestigator; }
    public void setLeadInvestigator(String leadInvestigator) { this.leadInvestigator = leadInvestigator; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
