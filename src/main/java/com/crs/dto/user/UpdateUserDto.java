package com.crs.dto.user;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class UpdateUserDto {

    private Long id;
    
	//@NotBlank(message = "first name can't be blank")
	private String firstName;

	//@NotBlank(message = "last name can't be blank")
	private String lastName;

	//@Email
	private String email;
	
	//@NotNull
	//@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})",message = "invalid password format!!!!")
	private String password;

	//@Pattern(regexp = "^[0-9]{10}$" ,message = "invalid password format!!!!")
	private String mobile;


	private Character gender;
}
