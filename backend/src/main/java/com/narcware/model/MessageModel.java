package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class MessageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String conversationId;
    private String sender;
    private String receiver;
    private String platform; // TELEGRAM, WHATSAPP, SIGNAL, SMS
    private String category; // DRUG_TRAFFICKING, EXAM_LEAK

    @Column(length = 4000)
    private String content;

    private int riskScore;
    private boolean flagged;
    private String caseNumber;
    private LocalDateTime timestamp = LocalDateTime.now();

    public MessageModel() {}

    public MessageModel(String conversationId, String sender, String receiver, String platform, String category, String content, int riskScore, boolean flagged, String caseNumber) {
        this.conversationId = conversationId;
        this.sender = sender;
        this.receiver = receiver;
        this.platform = platform;
        this.category = category;
        this.content = content;
        this.riskScore = riskScore;
        this.flagged = flagged;
        this.caseNumber = caseNumber;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getConversationId() { return conversationId; }
    public void setConversationId(String conversationId) { this.conversationId = conversationId; }
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
    public String getReceiver() { return receiver; }
    public void setReceiver(String receiver) { this.receiver = receiver; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
    public boolean isFlagged() { return flagged; }
    public void setFlagged(boolean flagged) { this.flagged = flagged; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
