package com.narcware.controller;

import com.narcware.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private EntityRepository entityRepository;

    @Autowired
    private EvidenceRepository evidenceRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardMetrics(@RequestParam(value = "category", required = false, defaultValue = "ALL") String category) {
        long activeCases = caseRepository.count();
        long totalAlerts = alertRepository.count();
        long highRiskAlerts = alertRepository.findAll().stream().filter(a -> "HIGH".equals(a.getRiskLevel())).count();
        long totalEntities = entityRepository.count();
        long verifiedEvidence = evidenceRepository.count();

        List<Map<String, Object>> categoryBreakdown = List.of(
            Map.of("category", "Drug Trafficking", "cases", 5, "alerts", 5, "fill", "#00f2fe"),
            Map.of("category", "Exam/Paper Leak", "cases", 3, "alerts", 2, "fill", "#f59e0b")
        );

        List<Map<String, Object>> riskDistribution = List.of(
            Map.of("name", "High Threat (75-100)", "value", 50, "fill", "#ef4444"),
            Map.of("name", "Medium Threat (45-74)", "value", 35, "fill", "#f59e0b"),
            Map.of("name", "Low Threat (0-44)", "value", 15, "fill", "#10b981")
        );

        List<Map<String, Object>> alertsOverTime = List.of(
            Map.of("date", "Aug 28", "alerts", 12, "highRisk", 4, "examLeak", 2),
            Map.of("date", "Aug 29", "alerts", 19, "highRisk", 7, "examLeak", 5),
            Map.of("date", "Aug 30", "alerts", 24, "highRisk", 11, "examLeak", 8),
            Map.of("date", "Sep 01", "alerts", 18, "highRisk", 6, "examLeak", 4),
            Map.of("date", "Sep 02", "alerts", 31, "highRisk", 15, "examLeak", 11),
            Map.of("date", "Sep 03", "alerts", 37, "highRisk", 18, "examLeak", 14)
        );

        List<Map<String, Object>> aiPerformance = List.of(
            Map.of("metric", "Precision", "value", 94.6),
            Map.of("metric", "Recall", "value", 92.4),
            Map.of("metric", "F1 Score", "value", 93.5),
            Map.of("metric", "Human Agreement Rate", "value", 97.1),
            Map.of("metric", "False Positive Rate", "value", 3.8)
        );

        return ResponseEntity.ok(Map.of(
            "activeCases", activeCases,
            "totalAlerts", totalAlerts,
            "highRiskAlerts", highRiskAlerts,
            "totalEntities", totalEntities,
            "verifiedEvidence", verifiedEvidence,
            "evidenceIntegrityPercent", 100.0,
            "categoryBreakdown", categoryBreakdown,
            "riskDistribution", riskDistribution,
            "alertsOverTime", alertsOverTime,
            "aiPerformance", aiPerformance
        ));
    }
}
