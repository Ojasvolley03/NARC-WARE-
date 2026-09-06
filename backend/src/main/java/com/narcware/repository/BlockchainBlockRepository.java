package com.narcware.repository;

import com.narcware.model.BlockchainBlockModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BlockchainBlockRepository extends JpaRepository<BlockchainBlockModel, Long> {
    Optional<BlockchainBlockModel> findByBlockIndex(Long blockIndex);
    Optional<BlockchainBlockModel> findFirstByOrderByBlockIndexDesc();
}
