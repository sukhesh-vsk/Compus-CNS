package com.compus.cns.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compus.cns.model.Blocks;
import com.compus.cns.repository.BlockRepo;

@Service
public class BlockService {
	@Autowired
	private BlockRepo block;
	
	public List<Blocks> getAllBlocks() {
		return block.findAll();
	}
	
	public List<Blocks> addBlocks(List<Blocks> data) {
		return block.saveAllAndFlush(data);
	}
	
	public Optional<Blocks> findByName(String name) {
		Optional<Blocks> blockData = block.findByName(name);
		return blockData;
	}
}
