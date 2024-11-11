package com.compus.cns.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.compus.cns.dto.NodesDTO;
import com.compus.cns.model.Nodes;
import com.compus.cns.service.NodeService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/m/nodes")
public class NodeController {
    @Autowired
    private NodeService nodeServ;

    @GetMapping("")
    public ResponseEntity<List<Nodes>> getNodes() {
        List<Nodes> nodes = nodeServ.getAllNodes();
        return new ResponseEntity<>(nodes, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNodes(@RequestBody List<NodesDTO> data) {
    	List<Nodes> node = data.stream()
    							.map(this::convertToNode)
    							.collect(Collectors.toList());
        try {
            nodeServ.addNodes(node);
            return new ResponseEntity<>("Nodes Added", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Couldn't add nodes", HttpStatus.CONFLICT);
        }   
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateNode(@RequestBody NodesDTO data) {
        try {
            boolean isUpdated = nodeServ.updateNodeById(data.getId(), data.getCoords(), data.getDesc());
            if (isUpdated) {
                return new ResponseEntity<>("Node Updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Node not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Couldn't update node", HttpStatus.CONFLICT);
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteNode(@RequestParam String desc) {
        try {
            boolean isDeleted = nodeServ.deleteNodeByDescription(desc);
            if (isDeleted) {
                return new ResponseEntity<>("Node Deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Node with description '" + desc + "' not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Couldn't delete node due to server error", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/distance")
    public ResponseEntity<Double> findDistanceBWNodes(@RequestParam Long node1, @RequestParam Long node2) {
    	Double distance = nodeServ.findDistanceBWNodes(node1, node2);
    	return new ResponseEntity<>(distance, HttpStatus.OK);
    }
    
    private Nodes convertToNode(NodesDTO data) {
        Nodes node = new Nodes();
        if (data.getId() != null) {
            node.setId(data.getId());
        }
        node.setDescription(data.getDesc());
        node.setCoords(data.getCoords());
        
        return node;
    }
}
