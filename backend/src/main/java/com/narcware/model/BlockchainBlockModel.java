package com.narcware.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blockchain_blocks")
public class BlockchainBlockModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long blockIndex;
    private String previousHash;
    private String blockHash;
    private String merkleRoot;

    @Column(length = 2000)
    private String transactionData; // Evidence ID, SHA-256 Hash, Investigator Badge

    private String validatorSignature;
    private LocalDateTime timestamp = LocalDateTime.now();

    public BlockchainBlockModel() {}

    public BlockchainBlockModel(Long blockIndex, String previousHash, String blockHash, String merkleRoot, String transactionData, String validatorSignature) {
        this.blockIndex = blockIndex;
        this.previousHash = previousHash;
        this.blockHash = blockHash;
        this.merkleRoot = merkleRoot;
        this.transactionData = transactionData;
        this.validatorSignature = validatorSignature;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBlockIndex() { return blockIndex; }
    public void setBlockIndex(Long blockIndex) { this.blockIndex = blockIndex; }
    public String getPreviousHash() { return previousHash; }
    public void setPreviousHash(String previousHash) { this.previousHash = previousHash; }
    public String getBlockHash() { return blockHash; }
    public void setBlockHash(String blockHash) { this.blockHash = blockHash; }
    public String getMerkleRoot() { return merkleRoot; }
    public void setMerkleRoot(String merkleRoot) { this.merkleRoot = merkleRoot; }
    public String getTransactionData() { return transactionData; }
    public void setTransactionData(String transactionData) { this.transactionData = transactionData; }
    public String getValidatorSignature() { return validatorSignature; }
    public void setValidatorSignature(String validatorSignature) { this.validatorSignature = validatorSignature; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
