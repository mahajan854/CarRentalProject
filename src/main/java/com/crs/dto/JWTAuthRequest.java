package com.crs.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JWTAuthRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String email;

    private String password;

}