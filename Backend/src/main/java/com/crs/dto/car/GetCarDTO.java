package com.crs.dto.car;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetCarDTO {

    private String vehicleNo;

    private String brand;

    private String model;

    private LocalDate makeYear;

    private String fuelType;

    private String driveType;

    private String category;

    private Integer seatingCapacity;

    private boolean haveABS;

    private boolean haveAirBags;

    private Double baseFare;

    private Integer tripsCompleted;

    private Long branchId;

    private boolean status;

    private boolean availability;

    private String imageUrl;
}
