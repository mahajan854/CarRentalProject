package com.crs.dto.feedback;

import com.crs.entities.Booking;
import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddFeedbackDTO {

    private Long bookingId;

    @Min(value = 1)
    @Max(value = 10)
    private Integer rating;

    private String feedbackText;
}
