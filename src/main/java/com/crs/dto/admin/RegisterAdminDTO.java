package com.crs.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterAdminDTO {

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private String password;

    private Long branchId;
}
