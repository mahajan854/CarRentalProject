package com.crs.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminAuthResponseDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private Long branchId;

    private String branchName;

    private String token;
}
