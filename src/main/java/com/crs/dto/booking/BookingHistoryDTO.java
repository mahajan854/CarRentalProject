package com.crs.dto.booking;

import com.crs.entities.Branch;
import com.crs.entities.Car;
import com.crs.entities.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingHistoryDTO {

    private Long id;

    private LocalDateTime bookingDate;

    private LocalDateTime fromDate;

    private LocalDateTime toDate;

    private LocalDateTime returnDate;

    private Double tripCost;

    private String status;

    private String branchLocality;

    private String branchCity;

    private Double penalty;

    private String carBrand;

    private String carModel;
}
