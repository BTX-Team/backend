package com.b2x.member.service;

import com.b2x.member.dto.LoginRequest;
import com.b2x.member.dto.MemberResponse;
import com.b2x.member.dto.SignupRequest;

public interface MemberService {

	/** 회원가입 */
	MemberResponse signup(SignupRequest request);

	/** 로그인 (Access Token 반환) */
	String login(LoginRequest request);

	/** 이메일 중복 확인 */
	boolean checkEmailDuplicate(String email);

	/** 닉네임 중복 확인 */
	boolean checkNicknameDuplicate(String nickname);

	/** 회원 정보 조회 */
	MemberResponse getMember(Long memberNo);
}
