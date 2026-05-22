package com.librum.dto;

public record QuizResultResponse(
        int totalQuestions,
        int correctAnswers,
        int xpEarned,
        int newTotalXp,
        int newLevel,
        boolean leveledUp
) {}
