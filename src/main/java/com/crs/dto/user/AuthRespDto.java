package com.crs.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthRespDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private boolean kycStatus;

    private Character gender;

    private boolean accountStatus;

    private String token;

    // private LocalDateTime createdAt = LocalDateTime.now();

    // private LocalDateTime modifiedAt = LocalDateTime.now();
}
