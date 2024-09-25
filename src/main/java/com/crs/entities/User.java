package com.crs.entities;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users", indexes = @Index(columnList = "email"))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id")
    private Long id;

    @Column(name = "first_name", length = 255, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 255, nullable = false)
    private String lastName;

    @Column(length = 50, unique = true, nullable = false)
    private String email;

    @Column(length = 15, unique = true, nullable = false)
    private String mobile;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(name = "kyc_status", nullable = false, columnDefinition = "int default 0")
    private boolean kycStatus=false;

    @Column(nullable = false)
    private Character gender;

    @Column(name = "account_status", nullable = false, columnDefinition = "int default 1")
    private boolean accountStatus=true;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();
}
