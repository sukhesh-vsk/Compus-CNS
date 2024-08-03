package com.compus.cns.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.compus.cns.model.Blocks;

public interface BlockRepo extends JpaRepository<Blocks, Long> {

}
