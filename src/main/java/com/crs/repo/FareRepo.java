package com.crs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crs.entities.Fare;

public interface FareRepo extends JpaRepository<Fare, Long> {


}
