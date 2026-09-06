package com.narcware.repository;

import com.narcware.model.EntityModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface EntityRepository extends JpaRepository<EntityModel, Long> {
    Optional<EntityModel> findByIdentifier(String identifier);
    List<EntityModel> findByCaseNumber(String caseNumber);
}
