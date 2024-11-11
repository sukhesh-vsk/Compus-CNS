package com.compus.cns.dto;

public class NodesDTO {
    private Long id;
    private double[] coords;
    private String desc;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public double[] getCoords() {
        return coords;
    }
    
    public void setCoords(double[] coords) {
        this.coords = coords;
    }
    
    public String getDesc() {
        return desc;
    }
    
    public void setDesc(String desc) {
        this.desc = desc;
    }
}
