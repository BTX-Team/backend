package com.b2x.member.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b2x.common.util.JwtUtil;
import com.b2x.member.dto.LoginRequest;
import com.b2x.member.dto.MemberResponse;
import com.b2x.member.dto.SignupRequest;
import com.b2x.member.entity.Member;
import com.b2x.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	@Override
	public MemberResponse signup(SignupRequest request) {

		if (memberRepository.existsByMemberEmail(request.getEmail())) {
			throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
		}

		if (memberRepository.existsByMemberNickname(request.getNickname())) {
			throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
		}

		Member member = Member.builder()
				.memberEmail(request.getEmail())
				.memberPw(passwordEncoder.encode(request.getPassword()))
				.memberNickname(request.getNickname())
				.memberTel(request.getTel())
				.build();

		memberRepository.save(member);

		return MemberResponse.from(member);
	}

	@Override
	@Transactional(readOnly = true)
	public String login(LoginRequest request) {

		Member member = memberRepository
				.findByMemberEmailAndMemberDelFl(request.getEmail(), "N")
				.orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다."));

		if (!passwordEncoder.matches(request.getPassword(), member.getMemberPw())) {
			throw new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다.");
		}

		return jwtUtil.generateAccessToken(
				member.getMemberNo(),
				member.getMemberEmail(),
				member.getMemberRole()
		);
	}

	@Override
	@Transactional(readOnly = true)
	public boolean checkEmailDuplicate(String email) {
		return memberRepository.existsByMemberEmail(email);
	}

	@Override
	@Transactional(readOnly = true)
	public boolean checkNicknameDuplicate(String nickname) {
		return memberRepository.existsByMemberNickname(nickname);
	}

	@Override
	@Transactional(readOnly = true)
	public MemberResponse getMember(Long memberNo) {
		Member member = memberRepository.findById(memberNo)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
		return MemberResponse.from(member);
	}
}
