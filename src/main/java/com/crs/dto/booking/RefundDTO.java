package com.crs.dto.booking;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RefundDTO {

    private Long cancellationId;

    private String transactionId;
}
