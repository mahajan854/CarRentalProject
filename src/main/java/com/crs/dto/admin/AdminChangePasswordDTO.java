package com.crs.dto.admin;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminChangePasswordDTO {

    private Long id;

    private  String password;

}
