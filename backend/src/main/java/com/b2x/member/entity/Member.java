package com.b2x.member.entity;

import com.b2x.common.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "MEMBER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
	@SequenceGenerator(name = "member_seq", sequenceName = "MEMBER_SEQ", allocationSize = 1)
	@Column(name = "MEMBER_NO")
	private Long memberNo;

	@Column(name = "MEMBER_EMAIL", nullable = false, unique = true)
	private String memberEmail;

	@Column(name = "MEMBER_PW", nullable = false)
	private String memberPw;

	@Column(name = "MEMBER_NICKNAME", nullable = false)
	private String memberNickname;

	@Column(name = "MEMBER_TEL")
	private String memberTel;

	@Column(name = "PROFILE_IMG")
	private String profileImg;

	@Column(name = "MEMBER_ROLE")
	@Builder.Default
	private String memberRole = "USER";

	@Column(name = "MEMBER_DEL_FL")
	@Builder.Default
	private String memberDelFl = "N";
}
