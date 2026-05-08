package com.librum.dto;

public record PhaseSegmentResponse(
        int segmentNumber,
        int totalSegments,
        String content,
        int estimatedMinutes,
        String phaseTitle,
        int phaseNumber,
        String bookTitle,
        String bookAuthor,
        String genreName
) {}
