package com.librum.dto;

public record GenreResponse(
        Long id,
        String name,
        String slug,
        String iconEmoji,
        String description
) {}
