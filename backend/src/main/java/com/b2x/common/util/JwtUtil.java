package com.b2x.common.util;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {

	private final SecretKey key;
	private final long accessTokenValidity;
	private final long refreshTokenValidity;

	public JwtUtil(String secretKey, long accessTokenValidity, long refreshTokenValidity) {
		this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
		this.accessTokenValidity = accessTokenValidity;
		this.refreshTokenValidity = refreshTokenValidity;
	}

	/** Access Token 생성 */
	public String generateAccessToken(Long memberNo, String email, String role) {
		return Jwts.builder()
				.subject(String.valueOf(memberNo))
				.claim("email", email)
				.claim("role", role)
				.claim("type", "ACCESS")
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + accessTokenValidity))
				.signWith(key)
				.compact();
	}

	/** Refresh Token 생성 */
	public String generateRefreshToken(Long memberNo) {
		return Jwts.builder()
				.subject(String.valueOf(memberNo))
				.claim("type", "REFRESH")
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + refreshTokenValidity))
				.signWith(key)
				.compact();
	}

	/** 토큰에서 Claims 추출 */
	private Claims getClaims(String token) {
		return Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	public Long getMemberNo(String token) {
		return Long.parseLong(getClaims(token).getSubject());
	}

	public String getEmail(String token) {
		return getClaims(token).get("email", String.class);
	}

	public String getRole(String token) {
		return getClaims(token).get("role", String.class);
	}

	public boolean validateToken(String token) {
		try {
			getClaims(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	public boolean isTokenExpired(String token) {
		try {
			return getClaims(token).getExpiration().before(new Date());
		} catch (JwtException | IllegalArgumentException e) {
			return true;
		}
	}
}
