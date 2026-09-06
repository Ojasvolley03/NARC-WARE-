package com.narcware.controller;

import com.narcware.model.BlockchainBlockModel;
import com.narcware.repository.BlockchainBlockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blockchain")
@CrossOrigin(origins = "*")
public class BlockchainController {

    @Autowired
    private BlockchainBlockRepository blockRepository;

    @GetMapping("/blocks")
    public ResponseEntity<List<BlockchainBlockModel>> getBlocks() {
        return ResponseEntity.ok(blockRepository.findAll());
    }
}
