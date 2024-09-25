package com.crs.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
public class AdminAuthRequestDTO {

    private String email;

    private String password;
}
