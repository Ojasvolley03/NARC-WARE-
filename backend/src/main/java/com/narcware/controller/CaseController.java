package com.narcware.controller;

import com.narcware.model.CaseModel;
import com.narcware.repository.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "*")
public class CaseController {

    @Autowired
    private CaseRepository caseRepository;

    @GetMapping
    public ResponseEntity<List<CaseModel>> getAllCases() {
        return ResponseEntity.ok(caseRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCaseById(@PathVariable Long id) {
        Optional<CaseModel> c = caseRepository.findById(id);
        return c.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-number/{caseNumber}")
    public ResponseEntity<?> getCaseByNumber(@PathVariable String caseNumber) {
        Optional<CaseModel> c = caseRepository.findByCaseNumber(caseNumber);
        return c.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCase(@RequestBody CaseModel newCase) {
        if (newCase.getCaseNumber() == null || newCase.getCaseNumber().isEmpty()) {
            newCase.setCaseNumber("CASE-2026-" + (100 + (int)(Math.random() * 899)));
        }
        newCase.setCreatedAt(LocalDateTime.now());
        newCase.setUpdatedAt(LocalDateTime.now());
        CaseModel saved = caseRepository.save(newCase);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<CaseModel> cOpt = caseRepository.findById(id);
        if (cOpt.isPresent()) {
            CaseModel c = cOpt.get();
            c.setStatus(body.get("status"));
            c.setUpdatedAt(LocalDateTime.now());
            caseRepository.save(c);
            return ResponseEntity.ok(c);
        }
        return ResponseEntity.notFound().build();
    }
}
