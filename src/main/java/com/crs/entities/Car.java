package com.crs.entities;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "car")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString()
public class Car {

    @Id
    @Column(name = "vehicle_no", columnDefinition = "char(15)")
    private String vehicleNo;

    @Column(length = 25, nullable = false)
    private String brand;

    @Column(length = 25, nullable = false)
    private String model;

    @Column(name = "make_year")
    private LocalDate makeYear;

    @Column(name = "fuel_type", nullable = false)
    private String fuelType;

    @Column(name = "drive_type", nullable = false)
    private String driveType;

    @Column(length = 10, nullable = false)
    private String category;

//    @ManyToOne
//    @JoinColumn(name = "cat_id")
//    private Category category;

    @Column(name = "seating_capacity", length = 2, nullable = false)
    private Integer seatingCapacity;

    @Column(name = "have_abs", nullable = false, columnDefinition = "int default 0")
    private boolean haveABS;

    @Column(name = "have_air_bags", nullable = false, columnDefinition = "int default 0")
    private boolean haveAirBags;

    @Column(name = "base_fare", columnDefinition = "Double(10,2) default 200")
    private Double baseFare;

    @Column(name = "trips_completed", columnDefinition = "int default 0")
    private Integer tripsCompleted = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(columnDefinition = "tinyint default 1", nullable = false)
    private Boolean status = true;

    @Column(columnDefinition = "tinyint default 1", nullable = false)
    private Boolean availability = true;

    @Column(columnDefinition = "varchar(255) default 'https://shorturl.at/hqy59'")
    private String imageUrl="https://shorturl.at/hqy59";

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();


}
