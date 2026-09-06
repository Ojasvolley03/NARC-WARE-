package com.narcware.repository;

import com.narcware.model.EvidenceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface EvidenceRepository extends JpaRepository<EvidenceModel, Long> {
    Optional<EvidenceModel> findByEvidenceId(String evidenceId);
    Optional<EvidenceModel> findBySha256Hash(String sha256Hash);
    List<EvidenceModel> findByCaseNumber(String caseNumber);
}
