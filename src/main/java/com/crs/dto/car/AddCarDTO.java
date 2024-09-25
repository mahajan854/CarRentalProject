package com.crs.dto.car;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AddCarDTO {

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

    private Long branchId;

    private String imageUrl;
}
