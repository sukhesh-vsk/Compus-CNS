package com.compus.cns.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.compus.cns.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("SELECT u FROM User u WHERE u.username = :name")
	Optional<User> findByName(@Param("name") String username);
	
	@Query("SELECT e FROM User e WHERE e.email = :email")
	Optional<User> findByEmail(@Param("email") String email);
}
