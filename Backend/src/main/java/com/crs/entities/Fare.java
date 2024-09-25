package com.crs.entities;


import lombok.*;

import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name = "fare")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Fare {

    @Id
    @Column(name = "booking_id")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    @Id
    @OneToOne
    @JoinColumn(name = "booking_id")
    @MapsId
    private Booking bookingId;

//    @Column(columnDefinition = "Decimal(10,2) default '0.0'")
//    private Double initialFare;

    //    @Column(name = "initial_transaction_id")
    @OneToOne
    @JoinColumn(name = "initial_transaction_id", unique = true)
    private Transaction initialTransaction;

    //    @Column(columnDefinition = "Decimal(10,2) default '0.0'")
//    private Double penalty;
//
    @OneToOne
    @JoinColumn(name = "penalty_transaction_id", unique = true)
    private Transaction penaltyTransaction;

}
