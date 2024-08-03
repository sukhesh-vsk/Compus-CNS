package com.compus.cns.model;

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

    private String name;
    private String description;
    private String block;
    private String landmark;

    @Column(columnDefinition = "Geometry(Point, 4326)")
    private Point coords;

    
   // Getters and Setters
   
	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public String getBlock() {
		return block;
	}

	public String getLandmark() {
		return landmark;
	}

	public Point getCoords() {
		return coords;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setBlock(String block) {
		this.block = block;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public void setCoords(Point coords) {
		this.coords = coords;
	}
} 