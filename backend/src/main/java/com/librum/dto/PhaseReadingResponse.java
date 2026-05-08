package com.librum.dto;

public record PhaseReadingResponse(
        Long id,
        int phaseNumber,
        String title,
        String bookTitle,
        String bookAuthor,
        int totalSegments,
        boolean isUnlocked,
        boolean isCompleted
) {}
