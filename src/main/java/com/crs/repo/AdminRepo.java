package com.crs.repo;

import com.crs.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Long> {

    Optional<Admin> findAdminByEmail(String Email);
}
