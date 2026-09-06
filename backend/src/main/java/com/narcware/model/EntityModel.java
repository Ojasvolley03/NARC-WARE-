package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "entities")
public class EntityModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // PHONE, USERNAME, WALLET, BANK_ACCT, ALIAS
    private String identifier; // e.g. +1-555-0192, @shadow_broker, 0x89A...
    private int riskScore; // 0 - 100
    private String riskLevel; // LOW, MEDIUM, HIGH
    private String caseNumber;
    
    @Column(length = 1000)
    private String threatFlags;

    private int messageCount;
    private int connectionCount;

    private LocalDateTime firstSeen = LocalDateTime.now();
    private LocalDateTime lastSeen = LocalDateTime.now();

    public EntityModel() {}

    public EntityModel(String name, String type, String identifier, int riskScore, String riskLevel, String caseNumber, String threatFlags, int messageCount, int connectionCount) {
        this.name = name;
        this.type = type;
        this.identifier = identifier;
        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
        this.caseNumber = caseNumber;
        this.threatFlags = threatFlags;
        this.messageCount = messageCount;
        this.connectionCount = connectionCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }
    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public String getThreatFlags() { return threatFlags; }
    public void setThreatFlags(String threatFlags) { this.threatFlags = threatFlags; }
    public int getMessageCount() { return messageCount; }
    public void setMessageCount(int messageCount) { this.messageCount = messageCount; }
    public int getConnectionCount() { return connectionCount; }
    public void setConnectionCount(int connectionCount) { this.connectionCount = connectionCount; }
    public LocalDateTime getFirstSeen() { return firstSeen; }
    public void setFirstSeen(LocalDateTime firstSeen) { this.firstSeen = firstSeen; }
    public LocalDateTime getLastSeen() { return lastSeen; }
    public void setLastSeen(LocalDateTime lastSeen) { this.lastSeen = lastSeen; }
}
