package com.b2x;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class B2XApplication {

	public static void main(String[] args) {
		SpringApplication.run(B2XApplication.class, args);
	}
}
