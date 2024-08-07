package com.compus.cns.model;

import org.locationtech.jts.geom.GeometryFactory;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Edges {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long edgeID;

    private Long node1; 
    private Long node2;
    private double distance;

    public double getDistance() {
        return distance;
    }
    public void setDistance(double distance) {
        GeometryFactory geom = new GeometryFactory();
        this.distance = distance;
    }
    // Getters and Setters
    public Long getEdgeID() {
        return edgeID;
    }
    public void setEdgeID(Long edgeID) {
        this.edgeID = edgeID;
    }
    public Long getNode1() {
        return node1;
    }
    public void setNode1(Long node1) {
        this.node1 = node1;
    }
    public Long getNode2() {
        return node2;
    }
    public void setNode2(Long node2) {
        this.node2 = node2;
    }

    
}

