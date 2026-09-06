package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
public class AlertModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String alertCode; // e.g. ALT-9042, ALT-EXM-9102

    private String caseNumber;
    private String category; // DRUG_TRAFFICKING, EXAM_LEAK
    private int riskScore; // 0-100
    private String riskLevel; // HIGH, MEDIUM, LOW
    private double confidence; // e.g. 94.8

    @Column(length = 1000)
    private String detectionReason;

    private String relatedEntities; // Comma separated identifiers
    private String status; // NEW, UNDER_REVIEW, VALIDATED, FALSE_POSITIVE, ESCALATED
    
    @Column(length = 2000)
    private String investigatorNotes;

    private LocalDateTime timestamp = LocalDateTime.now();

    public AlertModel() {}

    public AlertModel(String alertCode, String caseNumber, String category, int riskScore, String riskLevel, double confidence, String detectionReason, String relatedEntities, String status) {
        this.alertCode = alertCode;
        this.caseNumber = caseNumber;
        this.category = category;
        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
        this.confidence = confidence;
        this.detectionReason = detectionReason;
        this.relatedEntities = relatedEntities;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAlertCode() { return alertCode; }
    public void setAlertCode(String alertCode) { this.alertCode = alertCode; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }
    public String getDetectionReason() { return detectionReason; }
    public void setDetectionReason(String detectionReason) { this.detectionReason = detectionReason; }
    public String getRelatedEntities() { return relatedEntities; }
    public void setRelatedEntities(String relatedEntities) { this.relatedEntities = relatedEntities; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getInvestigatorNotes() { return investigatorNotes; }
    public void setInvestigatorNotes(String investigatorNotes) { this.investigatorNotes = investigatorNotes; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
