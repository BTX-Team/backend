package com.b2x.member.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.b2x.member.dto.LoginRequest;
import com.b2x.member.dto.MemberResponse;
import com.b2x.member.dto.SignupRequest;
import com.b2x.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Member", description = "회원 관련 API")
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@Operation(summary = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<Map<String, Object>> signup(@Valid @RequestBody SignupRequest request) {
		MemberResponse member = memberService.signup(request);
		return ResponseEntity.ok(Map.of("success", true, "data", member));
	}

	@Operation(summary = "로그인")
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
		String accessToken = memberService.login(request);
		return ResponseEntity.ok(Map.of(
				"success", true,
				"accessToken", accessToken
		));
	}

	@Operation(summary = "이메일 중복 확인")
	@GetMapping("/check-email")
	public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
		boolean isDuplicate = memberService.checkEmailDuplicate(email);
		return ResponseEntity.ok(Map.of("duplicate", isDuplicate));
	}

	@Operation(summary = "닉네임 중복 확인")
	@GetMapping("/check-nickname")
	public ResponseEntity<Map<String, Object>> checkNickname(@RequestParam String nickname) {
		boolean isDuplicate = memberService.checkNicknameDuplicate(nickname);
		return ResponseEntity.ok(Map.of("duplicate", isDuplicate));
	}

	@Operation(summary = "회원 정보 조회")
	@GetMapping("/{memberNo}")
	public ResponseEntity<Map<String, Object>> getMember(@PathVariable Long memberNo) {
		MemberResponse member = memberService.getMember(memberNo);
		return ResponseEntity.ok(Map.of("success", true, "data", member));
	}
}
