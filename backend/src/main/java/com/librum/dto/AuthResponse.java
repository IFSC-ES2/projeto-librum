package com.librum.dto;

import java.util.UUID;

public class AuthResponse {

    private UUID userId;
    private String token;

    public AuthResponse(UUID userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    public UUID getUserId() { return userId; }
    public String getToken() { return token; }
}
