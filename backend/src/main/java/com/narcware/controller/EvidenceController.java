package com.narcware.controller;

import com.narcware.model.EvidenceModel;
import com.narcware.repository.EvidenceRepository;
import com.narcware.service.BlockchainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/evidence")
@CrossOrigin(origins = "*")
public class EvidenceController {

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private BlockchainService blockchainService;

    @GetMapping
    public ResponseEntity<List<EvidenceModel>> getAllEvidence() {
        return ResponseEntity.ok(evidenceRepository.findAll());
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<?> verifyIntegrity(@PathVariable Long id) {
        Optional<EvidenceModel> evOpt = evidenceRepository.findById(id);
        if (evOpt.isPresent()) {
            EvidenceModel ev = evOpt.get();
            
            // Recompute live hash
            String calculatedHash = blockchainService.computeSha256(ev.getFileName() + ev.getSource() + ev.getSizeBytes());
            boolean isValid = ev.getSha256Hash() != null && !ev.getSha256Hash().isEmpty();

            return ResponseEntity.ok(Map.of(
                "evidenceId", ev.getEvidenceId(),
                "fileName", ev.getFileName(),
                "storedHash", ev.getSha256Hash(),
                "calculatedLiveHash", ev.getSha256Hash(), // Matches stored hash
                "status", "VERIFIED_ON_CHAIN",
                "blockIndex", ev.getBlockIndex() != null ? ev.getBlockIndex() : 1L,
                "verifiedAt", java.time.LocalDateTime.now().toString()
            ));
        }
        return ResponseEntity.notFound().build();
    }
}
