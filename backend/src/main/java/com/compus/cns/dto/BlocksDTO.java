package com.compus.cns.dto;

public class BlocksDTO {
	private Long blockID;
	private String type;
    private String name;
    private String description;
    private String block;
    private String landmark;

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

	public Long getBlockID() {
		return blockID;
	}

	public void setBlockID(Long blockID) {
		this.blockID = blockID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
