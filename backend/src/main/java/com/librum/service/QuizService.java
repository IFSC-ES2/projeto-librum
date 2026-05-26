package com.librum.service;

import com.librum.dto.QuizQuestionResponse;
import com.librum.dto.QuizResultRequest;
import com.librum.dto.QuizResultResponse;
import com.librum.model.QuizQuestion;
import com.librum.model.User;
import com.librum.repository.QuizQuestionRepository;
import com.librum.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final XpService xpService;
    private final UserRepository userRepository;

    public QuizService(
        QuizQuestionRepository quizQuestionRepository,
        XpService xpService,
        UserRepository userRepository
    ) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.xpService = xpService;
        this.userRepository = userRepository;
    }

    public List<QuizQuestionResponse> getQuestions(Long phaseId) {
        List<QuizQuestion> questions =
            quizQuestionRepository.findByPhaseIdOrderByOrderIndex(phaseId);
        if (questions.isEmpty()) {
            throw new EntityNotFoundException(
                "Nenhuma questao encontrada para a fase " + phaseId
            );
        }
        return questions
            .stream()
            .map(q ->
                new QuizQuestionResponse(
                    q.getId(),
                    q.getPhase().getId(),
                    q.getQuestionText(),
                    q.getOptionA(),
                    q.getOptionB(),
                    q.getOptionC(),
                    q.getOptionD(),
                    String.valueOf(q.getCorrectOption()),
                    q.getExplanation()
                )
            )
            .toList();
    }

    public QuizResultResponse submitQuiz(
        UUID userId,
        Long phaseId,
        List<QuizResultRequest.AnswerItem> answers
    ) {
        List<QuizQuestion> questions =
            quizQuestionRepository.findByPhaseIdOrderByOrderIndex(phaseId);
        if (questions.isEmpty()) {
            throw new EntityNotFoundException(
                "Nenhuma questao encontrada para a fase " + phaseId
            );
        }

        User user = userRepository
            .findById(userId)
            .orElseThrow(() ->
                new EntityNotFoundException("Usuario nao encontrado")
            );
        int oldLevel = user.getLevel();

        Map<Long, QuizQuestion> questionMap = questions
            .stream()
            .collect(Collectors.toMap(QuizQuestion::getId, q -> q));

        int correctAnswers = 0;
        for (QuizResultRequest.AnswerItem answer : answers) {
            String selected = answer.getSelectedOption().toUpperCase();
            if (!selected.matches("[ABCD]")) {
                throw new IllegalArgumentException(
                    "Opcao invalida: " + answer.getSelectedOption()
                );
            }
            QuizQuestion question = questionMap.get(answer.getQuestionId());
            if (
                question != null &&
                selected.charAt(0) ==
                    Character.toUpperCase(question.getCorrectOption())
            ) {
                correctAnswers++;
            }
        }

        int xpEarned = correctAnswers * 5;
        User updatedUser = xpService.addXp(userId, xpEarned);

        return new QuizResultResponse(
            questions.size(),
            correctAnswers,
            xpEarned,
            updatedUser.getXp(),
            updatedUser.getLevel(),
            updatedUser.getLevel() > oldLevel,
            null,
            false
        );
    }
}
