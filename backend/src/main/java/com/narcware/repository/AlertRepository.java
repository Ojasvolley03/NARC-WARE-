package com.narcware.repository;

import com.narcware.model.AlertModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface AlertRepository extends JpaRepository<AlertModel, Long> {
    Optional<AlertModel> findByAlertCode(String alertCode);
    List<AlertModel> findByCaseNumber(String caseNumber);
    List<AlertModel> findByStatus(String status);
}
