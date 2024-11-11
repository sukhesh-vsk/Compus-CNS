package com.compus.cns.service;

import java.util.List;
import java.util.Optional;

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
    
    public boolean updateNodeById(Long id, double[] coords, String desc) {
        Optional<Nodes> optionalNode = nodeRepo.findById(id);
        if (optionalNode.isPresent()) {
            Nodes node = optionalNode.get();
            node.setCoords(coords);
            node.setDescription(desc);
            nodeRepo.save(node);
            return true;
        }
        return false;
    }
    
    public boolean deleteNodeByDescription(String desc) {
        List<Nodes> nodes = nodeRepo.findByDescription(desc);
        if (nodes.isEmpty()) {
            return false;
        } else {
            nodeRepo.deleteAll(nodes);
            return true;
        }
    }
    
    public Double findDistanceBWNodes(Long node1, Long node2) {
    	Double distance = nodeRepo.getDistance(node1, node2);
    	return distance;
    }
}
