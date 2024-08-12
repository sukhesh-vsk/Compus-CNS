package com.compus.cns.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compus.cns.dto.BlocksDTO;
import com.compus.cns.exception.BadRequestException;
import com.compus.cns.exception.ConflictException;
import com.compus.cns.model.Blocks;
import com.compus.cns.model.Nodes;
import com.compus.cns.repository.NodeRepo;
import com.compus.cns.service.BlockService;

@RestController
@RequestMapping("/api/m/blocks")
@CrossOrigin(origins = "http://localhost:5173")
public class BlockController {
	@Autowired
	private BlockService blockServ;
	@Autowired
	private NodeRepo nodeRepo;
	
	@GetMapping("")
	public ResponseEntity<List<Blocks>> getAllBlocks() {
		List<Blocks> blocksList = blockServ.getAllBlocks();

        return new ResponseEntity<>(blocksList, HttpStatus.OK);
	}
	
	@PostMapping("/add")
    public ResponseEntity<String> addBlock(@RequestBody List<BlocksDTO> data) {
        try {
        	data.forEach(this::validateBlockData);
            List<Blocks> blockEntity = data.stream()
            							.map(this::convertToEntity)
            							.collect(Collectors.toList());
        	blockServ.addBlocks(blockEntity);
        } catch(Exception e) {
        	return new ResponseEntity<>("Invalid block details", HttpStatus.CONFLICT);
        }
        
        return new ResponseEntity<>("New Block Added", HttpStatus.CREATED);
    }

	
    private void validateBlockData(BlocksDTO data) {
        if (data.getName() == null) {
            throw new BadRequestException("Name should not be null");
        }
        if (data.getBlockID() == null) {
            throw new BadRequestException(data.getName() + ": Block ID should not be null");
        }
        if (!blockServ.findByName(data.getName()).isEmpty()) {
            throw new ConflictException("Data for " + data.getName() + " already exists");
        }
    }
    
    private Blocks convertToEntity(BlocksDTO data) {
    	Nodes node = nodeRepo.findById(data.getBlockID())
                .orElseThrow(() -> new RuntimeException("Invalid Node Provided for " + data.getName()));
        Blocks blockEntity = new Blocks();
        blockEntity.setBlockID(node);
        blockEntity.setType(data.getType());
        blockEntity.setName(data.getName());
        blockEntity.setDescription(data.getDescription());
        blockEntity.setBlock(data.getBlock());
        blockEntity.setLandmark(data.getLandmark());

        return blockEntity;
    }
}
