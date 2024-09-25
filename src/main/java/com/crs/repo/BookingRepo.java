package com.crs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crs.entities.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, Long> {

    @Query(value = "select * from booking b where b.user_id = :user_id", nativeQuery = true)
    List<Booking> findBookingByUserId(@Param("user_id") Long user_id);

    @Query(value = "select * from booking b where b.branch_id = :branch_id", nativeQuery = true)
    List<Booking> findBookingByBranchId(@Param("branch_id") Long branch_id);

}
