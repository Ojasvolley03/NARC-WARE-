package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "evidence")
public class EvidenceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String evidenceId; // e.g. EVD-881

    private String caseNumber;
    private String fileName;
    private String source; // TELEGRAM_EXPORT, CELL_TOWER_METADATA, WHATSAPP_EXPORT, CRYPTO_RECEIPT
    private String fileType; // JSON, CSV, TXT, PCAP
    private String sha256Hash;
    private long sizeBytes;
    
    private String integrityStatus; // VERIFIED_ON_CHAIN, PENDING, INTEGRITY_BREACH
    private Long blockIndex;
    
    @Column(length = 2000)
    private String chainOfCustody; // JSON log of custody events

    private LocalDateTime uploadTime = LocalDateTime.now();

    public EvidenceModel() {}

    public EvidenceModel(String evidenceId, String caseNumber, String fileName, String source, String fileType, String sha256Hash, long sizeBytes, String integrityStatus, Long blockIndex, String chainOfCustody) {
        this.evidenceId = evidenceId;
        this.caseNumber = caseNumber;
        this.fileName = fileName;
        this.source = source;
        this.fileType = fileType;
        this.sha256Hash = sha256Hash;
        this.sizeBytes = sizeBytes;
        this.integrityStatus = integrityStatus;
        this.blockIndex = blockIndex;
        this.chainOfCustody = chainOfCustody;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEvidenceId() { return evidenceId; }
    public void setEvidenceId(String evidenceId) { this.evidenceId = evidenceId; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
    public String getSha256Hash() { return sha256Hash; }
    public void setSha256Hash(String sha256Hash) { this.sha256Hash = sha256Hash; }
    public long getSizeBytes() { return sizeBytes; }
    public void setSizeBytes(long sizeBytes) { this.sizeBytes = sizeBytes; }
    public String getIntegrityStatus() { return integrityStatus; }
    public void setIntegrityStatus(String integrityStatus) { this.integrityStatus = integrityStatus; }
    public Long getBlockIndex() { return blockIndex; }
    public void setBlockIndex(Long blockIndex) { this.blockIndex = blockIndex; }
    public String getChainOfCustody() { return chainOfCustody; }
    public void setChainOfCustody(String chainOfCustody) { this.chainOfCustody = chainOfCustody; }
    public LocalDateTime getUploadTime() { return uploadTime; }
    public void setUploadTime(LocalDateTime uploadTime) { this.uploadTime = uploadTime; }
}
