package com.crs.dto.booking;

import com.crs.entities.Branch;
import com.crs.entities.Car;
import com.crs.entities.User;
import com.crs.enums.BookingStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetAllBranchBookingDTO {

    private Long Id;

    private Long userId;

    private Long branchId;

    private String vehicleNo;

    private LocalDateTime bookingDate;

    private LocalDateTime fromDate;

    private LocalDateTime toDate;

    private Double tripCost;

    private BookingStatus status;

    private LocalDateTime returnDate;

    private Double penalty = 0.0;
}
