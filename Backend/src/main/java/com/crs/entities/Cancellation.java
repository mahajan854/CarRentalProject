package com.crs.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Cancellation")
public class Cancellation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id", unique = true, nullable = false, referencedColumnName = "id")
    private Booking booking;

    @Column(length = 255)
    private String description;

    @Column(columnDefinition = "Double(10,2) default 0.0")
    private Double refundAmount = 0.0;
    

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "refund_trans_id", unique = true, referencedColumnName = "id")
    private Transaction refundTransactionId;

}
