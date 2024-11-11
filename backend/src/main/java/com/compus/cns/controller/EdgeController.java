package com.compus.cns.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.compus.cns.model.Edges;
import com.compus.cns.repository.NodeRepo;
import com.compus.cns.service.EdgeService;

@RestController
@RequestMapping("/api/m/edges")
// @CrossOrigin(origins = "http://localhost:5173")
public class EdgeController {
    @Autowired
    private EdgeService edgeServ;
    @Autowired
    private NodeRepo nodeRepo;
    
    @GetMapping("/view")
    public ResponseEntity<List<Edges>> getAllEdges() {
    	return new ResponseEntity<>(edgeServ.getAllEdges(), HttpStatus.OK);
    }
    
    @PostMapping("/add") 
    public ResponseEntity<String> createEdge(@RequestParam Long n1, @RequestParam Long n2) {
    	if(!edgeServ.createEdge(n1, n2)) {
    		return new ResponseEntity<>("Couldn't create a edge.", HttpStatus.CONFLICT);
    	}
    	
    	return new ResponseEntity<>("Created new edge b/w node "+n1+" node "+n2, HttpStatus.OK);
    }
    
    @PostMapping("/add/bulk")
    public ResponseEntity<?> createEdges(@RequestBody ArrayList<Long[]> edges) {
    	try {
	    	List<Edges> edgeData = edges.stream()
	    								.map(this::serializeEdgeData)
	    								.collect(Collectors.toList());
	    	edgeServ.createEdges(edgeData);
	    	return new ResponseEntity<>("Created all edges.", HttpStatus.CREATED);
    	} catch(Exception e) {
    		return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    	}
    }
    
    private Edges serializeEdgeData(Long[] nodes) {
    	Edges e = new Edges();
    	e.setNode1(nodeRepo.findById(nodes[0]).orElseThrow(() -> new RuntimeException(nodes[0] + " No such node exists.")));
    	e.setNode2(nodeRepo.findById(nodes[1]).orElseThrow(() -> new RuntimeException(nodes[1] + " No such node exists.")));
    	e.setDistance(nodeRepo.getDistance(nodes[0], nodes[1]));
    	return e;
    }
}
