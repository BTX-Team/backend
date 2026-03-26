package com.b2x.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileConfig implements WebMvcConfigurer {

	@Value("${file.profile.web-path}")
	private String profileWebPath;

	@Value("${file.profile.folder-path}")
	private String profileFolderPath;

	@Value("${file.board.web-path}")
	private String boardWebPath;

	@Value("${file.board.folder-path}")
	private String boardFolderPath;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler(profileWebPath + "**")
				.addResourceLocations("file:" + profileFolderPath);

		registry.addResourceHandler(boardWebPath + "**")
				.addResourceLocations("file:" + boardFolderPath);
	}

	@Bean
	public StandardServletMultipartResolver multipartResolver() {
		return new StandardServletMultipartResolver();
	}
}
