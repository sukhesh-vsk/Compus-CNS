package com.compus.cns.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compus.cns.model.Nodes;
import com.compus.cns.repository.NodeRepo;

@Service
public class NodeService {
    @Autowired 
    private NodeRepo nodeRepo;

    public List<Nodes> getAllNodes() {
        return nodeRepo.findAll();
    }

    public List<Nodes> addNodes(List<Nodes> data) {
        return nodeRepo.saveAllAndFlush(data);
    }
    
    public Double findDistanceBWNodes(Long node1, Long node2) {
    	Double distance = nodeRepo.getDistance(node1, node2);
    	return distance;
    }
}
