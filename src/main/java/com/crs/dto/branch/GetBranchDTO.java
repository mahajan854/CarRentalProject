package com.crs.dto.branch;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetBranchDTO {

    private Long id;

    private String locality;

    private String city;

    private String state;

    private Integer pincode;
}
