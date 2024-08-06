package com.compus.cns.dto;

import java.util.List;

public class NodesDTO {
    private List<Double> coords;
    private String desc;

    // Getters and Setters
    public List<Double> getCoords() {
        return coords;
    }
    public void setCoords(List<Double> coords) {
        this.coords = coords;
    }
    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }

    
}
