package com.compus.cns.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.compus.cns.model.Blocks;
import com.compus.cns.model.Nodes;

@Repository
public interface BlockRepo extends JpaRepository<Blocks, Nodes> {
	
	@Query("SELECT b FROM Blocks b WHERE b.name = :name")
	Optional<Blocks> findByName(@Param("name") String name);
}
