package com.compus.cns.dto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.compus.cns.model.Blocks;

public class BlocksDTO {
	@Autowired 
	private Blocks data;
	
    private String name;
    private String description;
    private String block;
    private String landmark;
    private List<Double> coords;

    // Getters and Setters
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

    public List<Double> getCoords() {
        return coords;
    }

    public void setCoords(List<Double> coords) {
        this.coords = coords;
    }
}
