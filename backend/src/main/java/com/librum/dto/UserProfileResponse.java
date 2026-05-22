package com.librum.dto;

import java.util.UUID;

public record UserProfileResponse(
        UUID id,
        String name,
        String email,
        int xp,
        int level
) {}
