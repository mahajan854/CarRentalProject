package com.crs.entities;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "documents")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "user")
public class Documents {

    @Id
    @Column(name = "user_id")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", unique = true)
    private User userId;

    @Column(name = "aadharno", nullable = false)
    private Long aadharNo;

    @Column(name = "drivingno", length = 16, nullable = false)
    private String drivingNo;

    @Column(name = "aadhar", nullable = false)
    private String aadharImg;

    @Column(name = "driving", nullable = false)
    private String drivingImg;

    @Column(name = "photo", nullable = false)
    private String photo;


}
