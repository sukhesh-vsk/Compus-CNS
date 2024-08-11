package com.compus.cns.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compus.cns.model.Edges;
import com.compus.cns.repository.EdgesRepo;
import com.compus.cns.repository.NodeRepo;

@Service
public class EdgeService {
    @Autowired
    private EdgesRepo edgeRepo;
    @Autowired
    private NodeRepo nodeRepo;
    
    public List<Edges> getAllEdges() {
    	return edgeRepo.findAll();
    }
    
    public Boolean createEdge(Long node1, Long node2) {
    	Edges edge = new Edges();
    	edge.setNode1(nodeRepo
    					.findById(node1)
    					.orElseThrow(() -> new RuntimeException("Node1 not found"))
    					);
    	edge.setNode2(nodeRepo
    					.findById(node2)
    					.orElseThrow(() -> new RuntimeException("Node2 not found"))
    					);
    	edge.setDistance(nodeRepo.getDistance(node1, node2));
    	
    	try {
    		edgeRepo.save(edge);	
    	} catch(Exception e) {
    		return false;
    	}
    	
    	return true;
    }
    
    public Boolean createEdges(List<Edges> data) {
    	try {
    		edgeRepo.saveAllAndFlush(data);	
    	} catch(Exception e) {
    		return false;
    	}
    	return true;
    }
}
