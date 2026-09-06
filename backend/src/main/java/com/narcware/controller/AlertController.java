package com.narcware.controller;

import com.narcware.model.AlertModel;
import com.narcware.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    @Autowired
    private AlertRepository alertRepository;

    @GetMapping
    public ResponseEntity<List<AlertModel>> getAllAlerts() {
        return ResponseEntity.ok(alertRepository.findAll());
    }

    @PutMapping("/{id}/action")
    public ResponseEntity<?> updateAlertAction(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<AlertModel> alertOpt = alertRepository.findById(id);
        if (alertOpt.isPresent()) {
            AlertModel alert = alertOpt.get();
            String action = body.get("action"); // VALIDATED, FALSE_POSITIVE, ESCALATED, UNDER_REVIEW
            String note = body.get("note");

            if (action != null) {
                alert.setStatus(action);
            }
            if (note != null && !note.isEmpty()) {
                String existing = alert.getInvestigatorNotes() != null ? alert.getInvestigatorNotes() + "\n" : "";
                alert.setInvestigatorNotes(existing + "[Note]: " + note);
            }
            alertRepository.save(alert);
            return ResponseEntity.ok(alert);
        }
        return ResponseEntity.notFound().build();
    }
}
