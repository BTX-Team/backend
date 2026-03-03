package com.benepicker.common.util;

import java.security.SecureRandom;

public class Utility {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public static String createAuthKey() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(SECURE_RANDOM.nextInt(10));
        }
        return sb.toString();
    }
}
