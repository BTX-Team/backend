package com.benepicker.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 웹(SockJS)용 엔드포인트
        registry.addEndpoint("/ws")
            .setAllowedOriginPatterns("http://localhost:5173")
            .withSockJS();

        // 모바일(React Native)용 순수 WebSocket 엔드포인트 — SockJS 미사용
        registry.addEndpoint("/ws-native")
            .setAllowedOriginPatterns("*");
    }
}
