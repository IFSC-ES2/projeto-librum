package com.librum.controller;

import com.librum.dto.QuizQuestionResponse;
import com.librum.dto.QuizResultRequest;
import com.librum.dto.QuizResultResponse;
import com.librum.model.User;
import com.librum.repository.UserRepository;
import com.librum.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    public QuizController(QuizService quizService, UserRepository userRepository) {
        this.quizService = quizService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{phaseId}")
    public ResponseEntity<List<QuizQuestionResponse>> getQuestions(
            @PathVariable Long phaseId,
            @AuthenticationPrincipal String email) {
        return ResponseEntity.ok(quizService.getQuestions(phaseId));
    }

    @PostMapping("/{phaseId}/submit")
    public ResponseEntity<QuizResultResponse> submitQuiz(
            @PathVariable Long phaseId,
            @Valid @RequestBody QuizResultRequest body,
            @AuthenticationPrincipal String email) {
        UUID userId = userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow();
        return ResponseEntity.ok(quizService.submitQuiz(userId, phaseId, body.getAnswers()));
    }
}
