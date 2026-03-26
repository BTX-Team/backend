package com.b2x.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "회원가입 요청 DTO")
public class SignupRequest {

	@NotBlank(message = "이메일을 입력해주세요.")
	@Email(message = "이메일 형식이 올바르지 않습니다.")
	@Schema(description = "회원 이메일", example = "user@example.com")
	private String email;

	@NotBlank(message = "비밀번호를 입력해주세요.")
	@Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.")
	@Schema(description = "비밀번호", example = "password123!")
	private String password;

	@NotBlank(message = "닉네임을 입력해주세요.")
	@Schema(description = "닉네임", example = "홍길동")
	private String nickname;

	@Schema(description = "전화번호", example = "010-1234-5678")
	private String tel;
}
