package com.narcware.service;

import com.narcware.model.BlockchainBlockModel;
import com.narcware.repository.BlockchainBlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.HexFormat;

@Service
public class BlockchainService {

    @Autowired
    private BlockchainBlockRepository blockRepository;

    public String computeSha256(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("SHA-256 calculation failed", e);
        }
    }

    public BlockchainBlockModel mintBlock(String evidenceId, String sha256Hash, String validatorBadge) {
        BlockchainBlockModel lastBlock = blockRepository.findFirstByOrderByBlockIndexDesc().orElse(null);
        
        long newIndex = (lastBlock != null) ? lastBlock.getBlockIndex() + 1 : 1;
        String prevHash = (lastBlock != null) ? lastBlock.getBlockHash() : "0000000000000000000000000000000000000000000000000000000000000000";
        
        String txData = String.format("{\"evidenceId\":\"%s\",\"hash\":\"%s\",\"validator\":\"%s\"}", evidenceId, sha256Hash, validatorBadge);
        String merkleRoot = computeSha256(txData);
        
        String rawBlock = newIndex + prevHash + merkleRoot + txData;
        String blockHash = computeSha256(rawBlock);
        
        String signature = "SIG_EC_SECP256K1_" + computeSha256(blockHash + validatorBadge).substring(0, 16).toUpperCase();

        BlockchainBlockModel block = new BlockchainBlockModel(newIndex, prevHash, blockHash, merkleRoot, txData, signature);
        return blockRepository.save(block);
    }
}
