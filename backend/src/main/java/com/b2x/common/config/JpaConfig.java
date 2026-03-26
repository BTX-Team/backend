package com.b2x.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class JpaConfig {
	// @CreatedDate, @LastModifiedDate 등 JPA Auditing 활성화
}
