package com.crs.repo;

import com.crs.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepo extends JpaRepository<Car, String> {

    @Query(value = "select * from car c where c.branch_id = :branch_id and c.availability = true and c.status = true", nativeQuery = true)
    List<Car> getCarsByBranchId(@Param("branch_id") Long branch_id);

    @Query(value = "select * from car c where c.branch_id = :branch_id", nativeQuery = true)
    List<Car> getAllCarsByBranchId(@Param("branch_id") Long branch_id);



}
