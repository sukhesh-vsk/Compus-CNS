package com.compus.cns.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.compus.cns.model.Blocks;

@Repository
public interface BlockRepo extends JpaRepository<Blocks, Long> {
	
	@Query("SELECT b FROM Blocks b WHERE b.name = :name")
	Optional<Blocks> findByName(@Param("name") String name);
}
