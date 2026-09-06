package com.narcware.controller;

import com.narcware.model.EntityModel;
import com.narcware.repository.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/entities")
@CrossOrigin(origins = "*")
public class EntityController {

    @Autowired
    private EntityRepository entityRepository;

    @GetMapping
    public ResponseEntity<List<EntityModel>> getAllEntities() {
        return ResponseEntity.ok(entityRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEntityById(@PathVariable Long id) {
        Optional<EntityModel> e = entityRepository.findById(id);
        return e.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/network-graph")
    public ResponseEntity<?> getNetworkGraph() {
        List<EntityModel> entities = entityRepository.findAll();
        
        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> links = new ArrayList<>();

        for (EntityModel e : entities) {
            nodes.add(Map.of(
                "id", e.getIdentifier(),
                "label", e.getName(),
                "type", e.getType(),
                "riskScore", e.getRiskScore(),
                "riskLevel", e.getRiskLevel(),
                "caseNumber", e.getCaseNumber()
            ));
        }

        // Connect high risk entities with sample cluster links
        if (entities.size() >= 4) {
            links.add(Map.of("source", "@ghost_operator", "target", "+1-555-0198", "relation", "TELEGRAM_INTERCEPT", "risk", 92));
            links.add(Map.of("source", "+1-555-0198", "target", "0x71C7656EC7ab88b098defB751B7401B5f6d89A2", "relation", "CRYPTO_PAYMENT", "risk", 89));
            links.add(Map.of("source", "@phantom_vendor", "target", "Jackal", "relation", "WHATSAPP_HANDOVER", "risk", 87));
            links.add(Map.of("source", "Jackal", "target", "+1-555-0198", "relation", "CELL_TOWER_CO_LOCATION", "risk", 76));
            links.add(Map.of("source", "@phantom_vendor", "target", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", "relation", "BTC_TRANSFER", "risk", 82));
        }

        return ResponseEntity.ok(Map.of("nodes", nodes, "links", links));
    }
}
