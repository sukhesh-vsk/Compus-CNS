package com.compus.cns.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.compus.cns.model.Nodes;

@Repository
public interface NodeRepo extends JpaRepository<Nodes, Long> {
    @Query(value = "SELECT ST_DistanceSphere(n1.coords, n2.coords) FROM Nodes n1, Nodes n2 WHERE n1.id = :node1 AND n2.id = :node2",
    	   nativeQuery = true)
    Double getDistance(@Param("node1") Long node1, @Param("node2") Long node2);
}
