package com.compus.cns.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.compus.cns.model.Nodes;

@Repository
public interface NodeRepo extends JpaRepository<Nodes, Long> {
    
}
