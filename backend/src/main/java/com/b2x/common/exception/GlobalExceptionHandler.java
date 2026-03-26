package com.b2x.common.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(JwtException.class)
	public ResponseEntity<Map<String, Object>> handleJwtException(JwtException e) {
		log.warn("JWT 인증 실패: {}", e.getMessage());

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(Map.of(
						"success", false,
						"message", "인증이 만료되었습니다. 다시 로그인해주세요."
				));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleException(Exception e) {
		log.error("서버 에러 발생: ", e);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(Map.of(
						"success", false,
						"message", "서버 내부 오류가 발생했습니다."
				));
	}
}
