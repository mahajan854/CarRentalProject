package com.crs.dto.booking;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AddBookingDto {
    //private Long id;

    private Long userId;

    private String carId;

    //private LocalDateTime bookingDate = LocalDateTime.now();

    private LocalDateTime fromDate;

    private LocalDateTime toDate;

    private Double tripCost;

    //private String status;

    private Long branchId;

    //private LocalDateTime returnDate;

    //private Double penalty;

    private Long initialTransactionId;

    //add transaction fields

    private String transId;

    private String paymentMode;

    private Double amount;

}
