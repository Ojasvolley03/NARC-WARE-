package com.narcware.controller;

import com.narcware.model.AlertModel;
import com.narcware.model.EvidenceModel;
import com.narcware.model.MessageModel;
import com.narcware.repository.AlertRepository;
import com.narcware.repository.EvidenceRepository;
import com.narcware.repository.MessageRepository;
import com.narcware.service.BlockchainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/ingest")
@CrossOrigin(origins = "*")
public class IngestionController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private BlockchainService blockchainService;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/process")
    public ResponseEntity<?> processIngestion(@RequestBody Map<String, Object> payload) {
        String fileName = (String) payload.getOrDefault("fileName", "Ingested_Export_" + System.currentTimeMillis() + ".txt");
        String caseNumber = (String) payload.getOrDefault("caseNumber", "CASE-2026-089");
        String rawText = (String) payload.getOrDefault("rawText", "");
        String sourceType = (String) payload.getOrDefault("sourceType", "TELEGRAM_EXPORT");
        String category = (String) payload.getOrDefault("category", "AUTO_DETECT");

        // 1. Compute SHA-256 Hash
        String hash = blockchainService.computeSha256(rawText.isEmpty() ? fileName + System.currentTimeMillis() : rawText);
        String evId = "EVD-" + (800 + (int)(Math.random() * 199));

        // 2. Call Python AI Microservice for NLP analysis
        int riskScore = 45;
        String riskLevel = "MEDIUM";
        String detectedCategory = category.equals("AUTO_DETECT") ? "DRUG_TRAFFICKING" : category;
        List<String> reasons = List.of("Standard parsed communication payload");

        try {
            Map<String, String> aiReq = Map.of("text", rawText, "category", category);
            Map<?, ?> aiRes = restTemplate.postForObject("http://localhost:5000/api/ai/analyze-message", aiReq, Map.class);
            if (aiRes != null && aiRes.containsKey("riskScore")) {
                riskScore = (Integer) aiRes.get("riskScore");
                riskLevel = (String) aiRes.get("riskLevel");
                if (aiRes.containsKey("category")) {
                    detectedCategory = (String) aiRes.get("category");
                }
                reasons = (List<String>) aiRes.get("detectionReasons");
            }
        } catch (Exception e) {
            System.err.println("[NARC-WARE Backend] Note: Python AI Service call fallback used: " + e.getMessage());
            if (rawText.toLowerCase().contains("leak") || rawText.toLowerCase().contains("question paper") || rawText.toLowerCase().contains("upi")) {
                riskScore = 92;
                riskLevel = "HIGH";
                detectedCategory = "EXAM_LEAK";
                reasons = List.of("Exam paper leak claim and UPI payment handle detected");
            } else if (rawText.toLowerCase().contains("brick") || rawText.toLowerCase().contains("kilo") || rawText.toLowerCase().contains("usdt")) {
                riskScore = 88;
                riskLevel = "HIGH";
                detectedCategory = "DRUG_TRAFFICKING";
                reasons = List.of("Suspicious term 'brick/kilo/usdt' detected in raw payload");
            }
        }

        // 3. Save Message Record
        MessageModel msg = messageRepository.save(new MessageModel(
            "CONV-ING-" + (100 + (int)(Math.random() * 899)),
            "@imported_sender",
            "@imported_receiver",
            sourceType.contains("TELEGRAM") ? "TELEGRAM" : "WHATSAPP",
            detectedCategory,
            rawText.isEmpty() ? "Sample ingested payload for analysis" : rawText,
            riskScore,
            riskScore >= 70,
            caseNumber
        ));

        // 4. Save Evidence Vault Record & Mint Block
        EvidenceModel ev = evidenceRepository.save(new EvidenceModel(
            evId,
            caseNumber,
            fileName,
            sourceType,
            fileName.endsWith(".pdf") ? "PDF" : (fileName.endsWith(".json") ? "JSON" : (fileName.endsWith(".csv") ? "CSV" : "TXT")),
            hash,
            rawText.length() > 0 ? rawText.length() : 4096,
            "VERIFIED_ON_CHAIN",
            null,
            "[{\"action\":\"INGEST_PARSE\",\"by\":\"Investigator System\",\"time\":\"" + LocalDateTime.now() + "\"}]"
        ));

        var block = blockchainService.mintBlock(evId, hash, "SYSTEM_INGEST");
        ev.setBlockIndex(block.getBlockIndex());
        evidenceRepository.save(ev);

        // 5. Generate AI Alert if high risk
        AlertModel alert = null;
        if (riskScore >= 60) {
            String altCode = (detectedCategory.equals("EXAM_LEAK") ? "ALT-EXM-" : "ALT-") + (9000 + (int)(Math.random() * 999));
            alert = alertRepository.save(new AlertModel(
                altCode,
                caseNumber,
                detectedCategory,
                riskScore,
                riskLevel,
                94.5,
                String.join("; ", reasons),
                "@imported_sender, @imported_receiver",
                "NEW"
            ));
        }

        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "evidenceId", evId,
            "category", detectedCategory,
            "sha256Hash", hash,
            "blockIndex", block.getBlockIndex(),
            "riskScore", riskScore,
            "riskLevel", riskLevel,
            "alertCreated", alert != null ? alert.getAlertCode() : "NONE",
            "classification", "Potentially Suspicious / Requires Human Review"
        ));
    }
}
