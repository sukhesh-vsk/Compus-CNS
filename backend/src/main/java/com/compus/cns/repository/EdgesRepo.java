package com.compus.cns.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.compus.cns.model.Edges;

@Repository
public interface EdgesRepo extends JpaRepository<Edges, Long> {

}