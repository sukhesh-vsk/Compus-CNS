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
    
    public List<Nodes> updateNodesByDesc(String desc, double[] coords) {
        List<Nodes> nodes = nodeRepo.findByDescription(desc);
        if (nodes != null && !nodes.isEmpty()) {
            for (Nodes node : nodes) {
                node.setCoords(coords);
                nodeRepo.save(node);
            }
        }
        return nodes;
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
}
