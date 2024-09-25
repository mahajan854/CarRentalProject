package com.crs.dto.booking;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CancelBookingDTO {

    private Long bookingId;

    private String description;
}
