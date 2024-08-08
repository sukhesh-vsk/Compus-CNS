package com.compus.cns.model;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Nodes {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column(columnDefinition = "Geometry(Point, 4326)", nullable = false)
    private Point coords;

    private String description;


    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double[] getCoords() {
        return new double[] {this.coords.getX(), this.coords.getY()};
    }

    public void setCoords(double[] coords) {
        GeometryFactory geom = new GeometryFactory();
        this.coords = geom.createPoint(new Coordinate(coords[0], coords[1]));
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    
}
