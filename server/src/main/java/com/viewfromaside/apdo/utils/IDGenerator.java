package com.viewfromaside.apdo.utils;

import java.security.SecureRandom;

public class IDGenerator {

    private static final String CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String random(int length) {
        StringBuilder id = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = RANDOM.nextInt(CHARS.length());
            id.append(CHARS.charAt(randomIndex));
        }
        return id.toString();
    }
}