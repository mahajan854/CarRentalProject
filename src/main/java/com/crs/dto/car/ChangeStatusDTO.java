package com.crs.dto.car;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChangeStatusDTO {

    @NotBlank
    private String car_id;

    @NotNull(message = "field can not be null")
    private Boolean status;
}
