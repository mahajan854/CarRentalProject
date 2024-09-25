package com.crs.entities;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Transaction {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_id")
    private String transId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

//    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(columnDefinition = "Decimal(10,2) default '0.0'")
    private Double amount;

    @Column(name = "payment_mode")
    private String paymentMode="online";


}
