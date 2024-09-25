package com.crs.dto.booking;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ToRefundBookingDTO {

    private Long bookingId;

    private Long cancellationId;

    private String customerName;

    private Double amountToBeRefunded;

    private Boolean isRefundPending;

    private LocalDateTime cancellationTime;




}
