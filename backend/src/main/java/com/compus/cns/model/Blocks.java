package com.compus.cns.model;

import java.util.List;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Blocks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    private String block;
    private String landmark;

    @Column(columnDefinition = "Geometry(Point, 4326)", nullable = false)
    private Point coords;

   // Getters and Setters 
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public String getBlock() {
		return block;
	}
	public void setBlock(String block) {
		this.block = block;
	}

	public String getLandmark() {
		return landmark;
	}
	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public Point getCoords() {
		return coords;
	}
	public void setCoords(double[] coords) {
        GeometryFactory geometryFactory = new GeometryFactory();
        this.coords = geometryFactory.createPoint(new Coordinate(coords[0], coords[1]));
	}
	
    public List<Double> getCoordsAsList() {
        return List.of(coords.getX(), coords.getY());
    }
} 