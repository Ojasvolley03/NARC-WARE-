package com.narcware.repository;

import com.narcware.model.AuditLogModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLogModel, Long> {
    List<AuditLogModel> findByUsername(String username);
    List<AuditLogModel> findAllByOrderByTimestampDesc();
}
