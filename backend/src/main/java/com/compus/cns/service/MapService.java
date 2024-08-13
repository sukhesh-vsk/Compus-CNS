package com.compus.cns.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compus.cns.model.Edges;
import com.compus.cns.model.Nodes;
import com.compus.cns.repository.EdgesRepo;

@Service
public class MapService {

    @Autowired
    private EdgesRepo edgesRepo;

    public List<double[]> locateDestination(Long startId, Long endId) {
        // Retrieve all edges from the database
        List<Edges> edges = edgesRepo.findAll();

        // Maps to store distances and predecessors
        Map<Long, Double> gScore = new HashMap<>();
        Map<Long, Long> cameFrom = new HashMap<>();
        PriorityQueue<NodeRecord> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> n.fScore));
        
        // Initialize gScores with infinity
        for (Edges edge : edges) {
            gScore.put(edge.getNode1().getId(), Double.POSITIVE_INFINITY);
            gScore.put(edge.getNode2().getId(), Double.POSITIVE_INFINITY);
        }

        // Start with the starting node
        gScore.put(startId, 0.0);
        openSet.add(new NodeRecord(startId, 0.0, heuristic(startId, endId, edges)));

        while (!openSet.isEmpty()) {
            NodeRecord current = openSet.poll();

            if (current.nodeId.equals(endId)) {
                return reconstructPath(cameFrom, current.nodeId, edges);
            }

            for (Edges edge : edges) {
                Long neighborId = null;
                if (edge.getNode1().getId() == current.nodeId) {
                    neighborId = edge.getNode2().getId();
                } else if (edge.getNode2().getId() == current.nodeId) {
                    neighborId = edge.getNode1().getId();
                }

                if (neighborId != null) {
                    double tentativeGScore = gScore.get(current.nodeId) + edge.getDistance();

                    if (tentativeGScore < gScore.get(neighborId)) {
                        cameFrom.put(neighborId, current.nodeId);
                        gScore.put(neighborId, tentativeGScore);
                        double fScore = tentativeGScore + heuristic(neighborId, endId, edges);
                        openSet.add(new NodeRecord(neighborId, tentativeGScore, fScore));
                    }
                }
            }
        }

        // If we reach here, there's no path
        return Collections.emptyList();
    }

    private double heuristic(Long nodeId, Long goalId, List<Edges> edges) {
        // Calculate the Euclidean distance as a heuristic
        Nodes node = getNodeById(nodeId, edges);
        Nodes goal = getNodeById(goalId, edges);

        return Math.sqrt(Math.pow(node.getCoords()[0] - goal.getCoords()[0], 2) +
                         Math.pow(node.getCoords()[1] - goal.getCoords()[1], 2));
    }

    private Nodes getNodeById(Long nodeId, List<Edges> edges) {
        for (Edges edge : edges) {
            if (edge.getNode1().getId() == nodeId) {
                return edge.getNode1();
            } else if (edge.getNode2().getId() == nodeId) {
                return edge.getNode2();
            }
        }
        return null;
    }

    private List<double[]> reconstructPath(Map<Long, Long> cameFrom, Long currentNodeId, List<Edges> edges) {
        List<double[]> path = new ArrayList<>();
        while (cameFrom.containsKey(currentNodeId)) {
            Nodes currentNode = getNodeById(currentNodeId, edges);
            path.add(currentNode.getCoords());
            currentNodeId = cameFrom.get(currentNodeId);
        }

        Collections.reverse(path);
        return path;
    }

    private static class NodeRecord {
        Long nodeId;
        double gScore;
        double fScore;

        NodeRecord(Long nodeId, double gScore, double fScore) {
            this.nodeId = nodeId;
            this.gScore = gScore;
            this.fScore = fScore;
        }
    }
}
