package com.crs.dto.user;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DocumentDto {

    private Long id;

    private Long aadharNo;

    private String drivingNo;

    private String aadharImg;

    private String drivingImg;

    private String photo;

}
