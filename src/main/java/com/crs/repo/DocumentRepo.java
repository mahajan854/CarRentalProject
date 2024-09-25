package com.crs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crs.entities.Documents;
import com.crs.entities.User;

public interface DocumentRepo extends JpaRepository<Documents, Long> {
    
}
