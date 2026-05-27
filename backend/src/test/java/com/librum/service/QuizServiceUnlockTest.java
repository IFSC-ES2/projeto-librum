package com.librum.service;

import com.librum.dto.QuizResultRequest;
import com.librum.dto.QuizResultResponse;
import com.librum.model.*;
import com.librum.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = org.mockito.quality.Strictness.LENIENT)
class QuizServiceUnlockTest {

    @Mock private QuizQuestionRepository quizQuestionRepository;
    @Mock private UserProgressRepository userProgressRepository;
    @Mock private UserRepository userRepository;
    @Mock private PhaseRepository phaseRepository;
    @Mock private XpService xpService;

    @InjectMocks private QuizService quizService;

    private UUID userId;
    private User user;
    private Phase fase1;
    private Phase fase2;
    private List<QuizQuestion> questions;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User();
        user.setXp(0);
        user.setLevel(1);

        Book book = mock(Book.class);
        Genre genre = new Genre();
        when(book.getGenre()).thenReturn(genre);
        when(book.getId()).thenReturn(1L);

        fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        when(fase1.getPhaseNumber()).thenReturn(1);
        when(fase1.getBook()).thenReturn(book);

        fase2 = mock(Phase.class);
        when(fase2.getId()).thenReturn(2L);
        when(fase2.getPhaseNumber()).thenReturn(2);
        when(fase2.getBook()).thenReturn(book);

        QuizQuestion q1 = new QuizQuestion();
        q1.setId(1L);
        q1.setCorrectOption('A');
        q1.setPhase(fase1);

        QuizQuestion q2 = new QuizQuestion();
        q2.setId(2L);
        q2.setCorrectOption('A');
        q2.setPhase(fase1);

        QuizQuestion q3 = new QuizQuestion();
        q3.setId(3L);
        q3.setCorrectOption('A');
        q3.setPhase(fase1);

        QuizQuestion q4 = new QuizQuestion();
        q4.setId(4L);
        q4.setCorrectOption('A');
        q4.setPhase(fase1);

        questions = List.of(q1, q2, q3, q4);

        when(xpService.addXp(any(), anyInt())).thenReturn(user);
    }

    private List<QuizResultRequest.AnswerItem> buildAnswers(String... options) {
        List<QuizResultRequest.AnswerItem> answers = new ArrayList<>();
        for (int i = 0; i < options.length; i++) {
            QuizResultRequest.AnswerItem item = new QuizResultRequest.AnswerItem();
            item.setQuestionId((long) (i + 1));
            item.setSelectedOption(options[i]);
            answers.add(item);
        }
        return answers;
    }

    @Test
    void submitQuiz_deve_marcar_quizCompleted_true_quando_aprovado() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L)).thenReturn(questions);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(phaseRepository.findByBookIdAndPhaseNumber(any(), eq(2))).thenReturn(Optional.of(fase2));
        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L)).thenReturn(Optional.empty());

        List<QuizResultRequest.AnswerItem> answers = buildAnswers("A", "A", "A", "A");
        QuizResultResponse result = quizService.submitQuiz(userId, 1L, answers);

        assertThat(result.passed()).isTrue();
        verify(userProgressRepository).save(argThat(p -> p.isQuizCompleted()));
    }

    @Test
    void submitQuiz_nao_deve_marcar_quizCompleted_quando_reprovado_com_mais_de_2_erros() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L)).thenReturn(questions);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        List<QuizResultRequest.AnswerItem> answers = buildAnswers("B", "B", "B", "A");
        QuizResultResponse result = quizService.submitQuiz(userId, 1L, answers);

        assertThat(result.passed()).isFalse();
        verify(userProgressRepository, never()).save(any());
    }

    @Test
    void submitQuiz_deve_retornar_passed_true_com_2_erros_ou_menos() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L)).thenReturn(questions);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(phaseRepository.findByBookIdAndPhaseNumber(any(), eq(2))).thenReturn(Optional.of(fase2));
        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L)).thenReturn(Optional.empty());

        List<QuizResultRequest.AnswerItem> answers = buildAnswers("A", "A", "B", "B");
        QuizResultResponse result = quizService.submitQuiz(userId, 1L, answers);

        assertThat(result.passed()).isTrue();
        assertThat(result.correctAnswers()).isEqualTo(2);
    }

    @Test
    void submitQuiz_deve_retornar_passed_false_com_3_ou_mais_erros() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L)).thenReturn(questions);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        List<QuizResultRequest.AnswerItem> answers = buildAnswers("B", "B", "B", "A");
        QuizResultResponse result = quizService.submitQuiz(userId, 1L, answers);

        assertThat(result.passed()).isFalse();
        assertThat(result.nextPhaseId()).isNull();
    }

    @Test
    void submitQuiz_deve_desbloquear_fase_seguinte_apenas_quando_aprovado() {
        when(quizQuestionRepository.findByPhaseIdOrderByOrderIndex(1L)).thenReturn(questions);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(phaseRepository.findByBookIdAndPhaseNumber(any(), eq(2))).thenReturn(Optional.of(fase2));
        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L)).thenReturn(Optional.empty());

        List<QuizResultRequest.AnswerItem> answers = buildAnswers("A", "A", "A", "A");
        QuizResultResponse result = quizService.submitQuiz(userId, 1L, answers);

        assertThat(result.nextPhaseId()).isEqualTo(2L);
    }
}