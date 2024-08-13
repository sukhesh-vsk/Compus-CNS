package com.compus.cns.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.compus.cns.model.Nodes;

@Repository
public interface NodeRepo extends JpaRepository<Nodes, Long> {
	List<Nodes> findByDescription(String desc);
	
	void deleteByDescription(String desc);
}
