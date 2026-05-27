package com.librum.dto;

public record QuizQuestionResponse(
        Long id,
        Long phaseId,
        String questionText,
        String optionA,
        String optionB,
        String optionC,
        String optionD,
        String correctOption,
        String explanation
) {}
