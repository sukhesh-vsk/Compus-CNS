package com.compus.cns.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compus.cns.dto.BlocksDTO;
import com.compus.cns.exception.BadRequestException;
import com.compus.cns.exception.ConflictException;
import com.compus.cns.model.Blocks;
import com.compus.cns.service.BlockService;

@RestController
@RequestMapping("/api/m/blocks")
public class BlockController {
	@Autowired
	private BlockService blockServ;
	
	@GetMapping("")
	public ResponseEntity<List<BlocksDTO>> getAllBlocks() {
		List<Blocks> blocksList = blockServ.getAllBlocks();
        List<BlocksDTO> blocksDTOList = blocksList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(blocksDTOList, HttpStatus.OK);
	}
	
	@PostMapping("/add")
    public ResponseEntity<String> addBlock(@RequestBody List<BlocksDTO> data) {
		
        data.forEach(this::validateBlockData);
        List<Blocks> blockEntity = data.stream()
        								.map(this::convertToEntity)
        								.collect(Collectors.toList());
        blockServ.addBlocks(blockEntity);

        return new ResponseEntity<>("New Block Added", HttpStatus.CREATED);
    }

    private void validateBlockData(BlocksDTO data) {
        if (data.getName() == null) {
            throw new BadRequestException("Name should not be null");
        }
        if (data.getCoords() == null || data.getCoords().size() != 2 || data.getCoords().contains(null)) {
            throw new BadRequestException(data.getName() + ": Invalid coordinates data format. Please provide exactly two non-null values for 'coords'.");
        }
        if (!blockServ.findByName(data.getName()).isEmpty()) {
            throw new ConflictException("Data for " + data.getName() + " already exists");
        }
    }

    private Blocks convertToEntity(BlocksDTO data) {
        Blocks blockEntity = new Blocks();
        blockEntity.setName(data.getName());
        blockEntity.setDescription(data.getDescription());
        blockEntity.setBlock(data.getBlock());
        blockEntity.setLandmark(data.getLandmark());
        double[] coordinates = {data.getCoords().get(0), data.getCoords().get(1)};
        blockEntity.setCoords(coordinates);
        return blockEntity;
    }
    
    private BlocksDTO convertToDTO(Blocks block) {
        BlocksDTO blocksDTO = new BlocksDTO();
        blocksDTO.setName(block.getName());
        blocksDTO.setDescription(block.getDescription());
        blocksDTO.setBlock(block.getBlock());
        blocksDTO.setLandmark(block.getLandmark());
        blocksDTO.setCoords(block.getCoordsAsList());
        return blocksDTO;
    }
}
