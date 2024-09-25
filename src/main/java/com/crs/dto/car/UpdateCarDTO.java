package com.crs.dto.car;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdateCarDTO {

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

    private boolean status;
}
