package com.crs.repo;

import com.crs.entities.Cancellation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CancellationRepo extends JpaRepository<Cancellation, Long> {

    @Query("select c from Cancellation c where c.refundAmount > 0.0")
    List<Cancellation> getAllByRefundAmount();
}
