package com.crs.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpdateAdminDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String mobile;
}
