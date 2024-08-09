package com.compus.cns.model;

import org.hibernate.annotations.OnDeleteAction;
import org.locationtech.jts.geom.GeometryFactory;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import com.compus.cns.model.Nodes;

@Entity
public class Edges {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long edgeID;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "node1", referencedColumnName = "id")
    private Nodes node1;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "node2", referencedColumnName = "id")
    private Nodes node2;
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
    public Nodes getNode1() {
        return node1;
    }
    public void setNode1(Nodes node1) {
        this.node1 = node1;
    }
    public Nodes getNode2() {
        return node2;
    }
    public void setNode2(Nodes node2) {
        this.node2 = node2;
    }

    
}

