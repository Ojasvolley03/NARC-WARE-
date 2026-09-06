package com.narcware.repository;

import com.narcware.model.CaseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface CaseRepository extends JpaRepository<CaseModel, Long> {
    Optional<CaseModel> findByCaseNumber(String caseNumber);
    List<CaseModel> findByStatus(String status);
}
