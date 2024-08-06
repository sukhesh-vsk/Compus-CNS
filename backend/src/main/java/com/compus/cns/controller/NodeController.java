package com.compus.cns.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.compus.cns.dto.NodesDTO;
import com.compus.cns.model.Nodes;
import com.compus.cns.service.NodeService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<List<NodesDTO>> addNodes(@RequestBody List<NodesDTO> data) {
        return new ResponseEntity<>(nodeServ.addNodes(data), HttpStatus.CREATED);
    }

}
