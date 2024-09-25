package com.crs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crs.entities.Transaction;


public interface TransactionRepo extends JpaRepository<Transaction, Long> {
    
}
