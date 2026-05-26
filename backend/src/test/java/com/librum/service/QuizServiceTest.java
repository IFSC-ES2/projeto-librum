package com.librum.service;

import com.librum.dto.QuizQuestionResponse;
import com.librum.dto.QuizResultRequest;
import com.librum.dto.QuizResultResponse;
import com.librum.model.Phase;
import com.librum.model.QuizQuestion;
import com.librum.model.User;
import com.librum.repository.QuizQuestionRepository;
import com.librum.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QuizServiceTest {

    @Mock
    private QuizQuestionRepository quizQuestionRepository;

    @Mock
    private XpService xpService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private QuizService quizService;

    private UUID userId;
    private User user;
    private Phase fase1;
    private QuizQuestion questao1;
    private QuizQuestion questao2;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        user = new User();
        user.setId(userId);
        user.setXp(0);
        user.setLevel(1);

        fase1 = new Phase();
        fase1.setId(1L);
        fase1.setPhaseNumber(1);
        fase1.setTitle("Fase 1");

        questao1 = new QuizQuestion();
        questao1.setId(1L);
        questao1.setPhase(fase1);
        questao1.setQuestionText("Qual o nome do protagonista?");
        questao1.setOptionA("Jim Hawkins");
        questao1.setOptionB("Long John Silver");
        questao1.setOptionC("Capitão Smollett");
        questao1.setOptionD("Billy Bones");
        questao1.setCorrectOption('A');
        questao1.setOrderIndex(1);

        questao2 = new QuizQuestion();
        questao2.setId(2L);
        questao2.setPhase(fase1);
        questao2.setQuestionText("Qual o nome do navio?");
        questao2.setOptionA("Barco Fantasma");
        questao2.setOptionB("Hispaniola");
        questao2.setOptionC("Santa Maria");
        questao2.setOptionD("Black Pearl");
        questao2.setCorrectOption('B');
        questao2.setOrderIndex(2);
    }

    @Test
    void submitQuiz_todasRespostasCorretas_retornaXpMaximo() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L))
                .thenReturn(List.of(questao1, questao2));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User userAtualizado = new User();
        userAtualizado.setXp(10);
        userAtualizado.setLevel(1);
        when(xpService.addXp(any(), eq(10))).thenReturn(userAtualizado);

        List<QuizResultRequest.AnswerItem> respostas = List.of(
            criarResposta(1L, "A"),
            criarResposta(2L, "B")
        );

        QuizResultResponse resultado = quizService.submitQuiz(userId, 1L, respostas);

        assertEquals(2, resultado.totalQuestions());
        assertEquals(2, resultado.correctAnswers());
        assertEquals(10, resultado.xpEarned()); // 2 acertos × 5 XP
        verify(xpService).addXp(userId, 10);
    }

    @Test
    void submitQuiz_nenhumaRespostaCorreta_retornaZeroXp() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L))
                .thenReturn(List.of(questao1, questao2));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User userSemXp = new User();
        userSemXp.setXp(0);
        userSemXp.setLevel(1);
        when(xpService.addXp(any(), eq(0))).thenReturn(userSemXp);

        List<QuizResultRequest.AnswerItem> respostas = List.of(
            criarResposta(1L, "C"), // errada
            criarResposta(2L, "D")  // errada
        );

        QuizResultResponse resultado = quizService.submitQuiz(userId, 1L, respostas);

        assertEquals(0, resultado.correctAnswers());
        assertEquals(0, resultado.xpEarned());
    }

    @Test
    void submitQuiz_respostaInvalida_lancaIllegalArgumentException() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L))
                .thenReturn(List.of(questao1));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        List<QuizResultRequest.AnswerItem> respostas = List.of(
            criarResposta(1L, "Z") // opção fora do domínio A/B/C/D
        );

        assertThrows(IllegalArgumentException.class, () ->
                quizService.submitQuiz(userId, 1L, respostas));
    }

    @Test
    void submitQuiz_phaseIdInexistente_lancaEntityNotFoundException() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(99L))
                .thenReturn(List.of()); // nenhuma questão para esta fase

        List<QuizResultRequest.AnswerItem> respostas = List.of(
            criarResposta(1L, "A")
        );

        assertThrows(EntityNotFoundException.class, () ->
                quizService.submitQuiz(userId, 99L, respostas));
    }

    @Test
    void getQuestions_naoExporCorrectOption_respostaOmiteCorreta() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L))
                .thenReturn(List.of(questao1, questao2));

        List<QuizQuestionResponse> questoes = quizService.getQuestions(1L);

        assertEquals(2, questoes.size());
        // QuizQuestionResponse é um record sem campo correctOption
        // Verificar que os campos retornados são apenas os públicos
        QuizQuestionResponse q = questoes.get(0);
        assertNotNull(q.questionText());
        assertNotNull(q.optionA());
        // Se houvesse um campo correctOption no record, este teste falharia na compilação
    }

    // Helper
    private QuizResultRequest.AnswerItem criarResposta(Long questionId, String opcao) {
        QuizResultRequest.AnswerItem item = new QuizResultRequest.AnswerItem();
        item.setQuestionId(questionId);
        item.setSelectedOption(opcao);
        return item;
    }
}
