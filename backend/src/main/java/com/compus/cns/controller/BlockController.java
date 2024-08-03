package com.compus.cns.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compus.cns.model.Blocks;
import com.compus.cns.service.BlockService;

@RestController
@RequestMapping("/api/m/blocks")
public class BlockController {
	@Autowired
	private BlockService blockServ;
	
	@GetMapping("")
	public ResponseEntity<List<Blocks>> getAllBlocks() {
		List<Blocks> blocks = blockServ.getAllBlocks();
		return new ResponseEntity<>(blocks, HttpStatus.OK);
	}
}
