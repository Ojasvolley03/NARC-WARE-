package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLogModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String userRole;
    private String action; // LOGIN, CASE_VIEW, EVIDENCE_INGEST, HASH_VERIFY, ALERT_REVIEW, REPORT_EXPORT
    private String target; // Case #, Evidence ID, Entity ID
    
    @Column(length = 1000)
    private String details;

    private String ipAddress;
    private LocalDateTime timestamp = LocalDateTime.now();

    public AuditLogModel() {}

    public AuditLogModel(String username, String userRole, String action, String target, String details, String ipAddress) {
        this.username = username;
        this.userRole = userRole;
        this.action = action;
        this.target = target;
        this.details = details;
        this.ipAddress = ipAddress;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
