package com.librum.service;

import com.librum.model.Book;
import com.librum.model.Phase;
import com.librum.repository.PhaseRepository;
import com.librum.repository.UserProgressRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class PhaseUnlockServiceTest {

    @Mock private PhaseRepository phaseRepository;
    @Mock private UserProgressRepository userProgressRepository;

    @InjectMocks private PhaseUnlockService phaseUnlockService;

    private final UUID userId = UUID.randomUUID();

    @Test
    void deve_retornar_true_para_fase_1_sempre() {
        Phase fase1 = mock(Phase.class);
        when(fase1.getPhaseNumber()).thenReturn(1);

        boolean resultado = phaseUnlockService.isPhaseUnlocked(userId, fase1);

        assertThat(resultado).isTrue();
        verify(userProgressRepository, never())
                .existsByUserIdAndPhaseIdAndQuizCompletedTrue(any(), any());
    }

    @Test
    void deve_retornar_false_se_quiz_anterior_nao_concluido() {
        Book book = mock(Book.class);
        when(book.getId()).thenReturn(1L);

        Phase fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        when(fase1.getPhaseNumber()).thenReturn(1);

        Phase fase2 = mock(Phase.class);
        when(fase2.getPhaseNumber()).thenReturn(2);
        when(fase2.getBook()).thenReturn(book);

        when(phaseRepository.findByBookIdOrderByPhaseNumber(1L))
                .thenReturn(List.of(fase1, fase2));
        when(userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 1L))
                .thenReturn(false);

        boolean resultado = phaseUnlockService.isPhaseUnlocked(userId, fase2);

        assertThat(resultado).isFalse();
    }

    @Test
    void deve_retornar_true_se_quiz_anterior_concluido() {
        Book book = mock(Book.class);
        when(book.getId()).thenReturn(1L);

        Phase fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        when(fase1.getPhaseNumber()).thenReturn(1);

        Phase fase2 = mock(Phase.class);
        when(fase2.getPhaseNumber()).thenReturn(2);
        when(fase2.getBook()).thenReturn(book);

        when(phaseRepository.findByBookIdOrderByPhaseNumber(1L))
                .thenReturn(List.of(fase1, fase2));
        when(userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 1L))
                .thenReturn(true);

        boolean resultado = phaseUnlockService.isPhaseUnlocked(userId, fase2);

        assertThat(resultado).isTrue();
    }
}
