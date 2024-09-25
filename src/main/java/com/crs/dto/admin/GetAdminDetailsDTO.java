package com.crs.dto.admin;

import com.crs.entities.Branch;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetAdminDetailsDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private Long branchId;

    private String branchName;
}
