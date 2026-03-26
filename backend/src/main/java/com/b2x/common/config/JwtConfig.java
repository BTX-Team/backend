package com.b2x.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.b2x.common.util.JwtUtil;

@Configuration
public class JwtConfig {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.access-token-validity}")
	private long accessTokenValidity;

	@Value("${jwt.refresh-token-validity}")
	private long refreshTokenValidity;

	@Bean
	public JwtUtil jwtUtil() {
		return new JwtUtil(secretKey, accessTokenValidity, refreshTokenValidity);
	}
}
