package com.compus.cns.service;

import java.util.List;

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
}
