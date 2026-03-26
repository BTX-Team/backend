package com.b2x.member.dto;

import com.b2x.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "회원 응답 DTO")
public class MemberResponse {

	@Schema(description = "회원 번호")
	private Long memberNo;

	@Schema(description = "이메일")
	private String email;

	@Schema(description = "닉네임")
	private String nickname;

	@Schema(description = "전화번호")
	private String tel;

	@Schema(description = "프로필 이미지")
	private String profileImg;

	@Schema(description = "권한")
	private String role;

	public static MemberResponse from(Member member) {
		return MemberResponse.builder()
				.memberNo(member.getMemberNo())
				.email(member.getMemberEmail())
				.nickname(member.getMemberNickname())
				.tel(member.getMemberTel())
				.profileImg(member.getProfileImg())
				.role(member.getMemberRole())
				.build();
	}
}
