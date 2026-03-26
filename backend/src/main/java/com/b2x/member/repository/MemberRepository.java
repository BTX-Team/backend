package com.b2x.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b2x.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByMemberEmailAndMemberDelFl(String email, String delFl);

	boolean existsByMemberEmail(String email);

	boolean existsByMemberNickname(String nickname);
}
