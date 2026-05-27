package com.librum.service;

import com.librum.model.*;
import com.librum.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = org.mockito.quality.Strictness.LENIENT)
class ReadingServiceUnlockTest {

    @Mock private BookRepository bookRepository;
    @Mock private PhaseRepository phaseRepository;
    @Mock private PhaseSegmentRepository phaseSegmentRepository;
    @Mock private UserProgressRepository userProgressRepository;

    @InjectMocks private ReadingService readingService;

    private final UUID userId = UUID.randomUUID();

    @Test
    void isPhaseUnlocked_deve_retornar_true_para_fase_1_sempre() {
        Book book = mock(Book.class);
        when(book.getId()).thenReturn(1L);

        Phase fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        when(fase1.getPhaseNumber()).thenReturn(1);
        when(fase1.getBook()).thenReturn(book);

        when(phaseRepository.findByBookIdOrderByPhaseNumber(1L)).thenReturn(List.of(fase1));

        PhaseSegment segment = mock(PhaseSegment.class);
        when(segment.getSegmentNumber()).thenReturn(1);
        when(segment.getContent()).thenReturn("conteudo");
        when(segment.getEstimatedMinutes()).thenReturn(3);
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(phaseSegmentRepository.findByPhaseIdAndSegmentNumber(1L, 1))
                .thenReturn(Optional.of(segment));
        when(phaseSegmentRepository.countByPhaseId(1L)).thenReturn(3);

        Genre genre = mock(Genre.class);
        when(genre.getName()).thenReturn("Aventura");
        when(genre.getSlug()).thenReturn("aventura");
        when(book.getGenre()).thenReturn(genre);
        when(book.getTitle()).thenReturn("A Ilha do Tesouro");
        when(book.getAuthor()).thenReturn("Robert Louis Stevenson");
        when(fase1.getTitle()).thenReturn("Fase 1");

        readingService.getPhaseSegment(userId, 1L, 1);

        verify(userProgressRepository, never())
                .existsByUserIdAndPhaseIdAndQuizCompletedTrue(any(), any());
    }

    @Test
    void isPhaseUnlocked_deve_retornar_false_se_quiz_anterior_nao_concluido() {
        Book book = mock(Book.class);
        when(book.getId()).thenReturn(1L);

        Phase fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        when(fase1.getPhaseNumber()).thenReturn(1);
        when(fase1.getBook()).thenReturn(book);

        Phase fase2 = mock(Phase.class);
        when(fase2.getId()).thenReturn(2L);
        when(fase2.getPhaseNumber()).thenReturn(2);
        when(fase2.getBook()).thenReturn(book);

        when(phaseRepository.findById(2L)).thenReturn(Optional.of(fase2));
        when(phaseRepository.findByBookIdOrderByPhaseNumber(1L))
                .thenReturn(List.of(fase1, fase2));
        when(userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 1L))
                .thenReturn(false);

        org.springframework.security.access.AccessDeniedException ex =
                org.junit.jupiter.api.Assertions.assertThrows(
                        org.springframework.security.access.AccessDeniedException.class,
                        () -> readingService.getPhaseSegment(userId, 2L, 1)
                );

        assertThat(ex.getMessage()).contains("bloqueada");
    }

    @Test
    void isPhaseUnlocked_deve_retornar_true_se_quiz_anterior_concluido() {
        Book book = mock(Book.class);
        when(book.getId()).thenReturn(1L);

        Phase fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        when(fase1.getPhaseNumber()).thenReturn(1);
        when(fase1.getBook()).thenReturn(book);

        Phase fase2 = mock(Phase.class);
        when(fase2.getId()).thenReturn(2L);
        when(fase2.getPhaseNumber()).thenReturn(2);
        when(fase2.getBook()).thenReturn(book);

        PhaseSegment segment = mock(PhaseSegment.class);
        when(segment.getSegmentNumber()).thenReturn(1);
        when(segment.getContent()).thenReturn("conteudo");
        when(segment.getEstimatedMinutes()).thenReturn(3);

        Genre genre = mock(Genre.class);
        when(genre.getName()).thenReturn("Aventura");
        when(genre.getSlug()).thenReturn("aventura");
        when(book.getGenre()).thenReturn(genre);
        when(book.getTitle()).thenReturn("A Ilha do Tesouro");
        when(book.getAuthor()).thenReturn("Robert Louis Stevenson");
        when(fase2.getTitle()).thenReturn("Fase 2");

        when(phaseRepository.findById(2L)).thenReturn(Optional.of(fase2));
        when(phaseRepository.findByBookIdOrderByPhaseNumber(1L))
                .thenReturn(List.of(fase1, fase2));
        when(userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 1L))
                .thenReturn(true);
        when(phaseSegmentRepository.findByPhaseIdAndSegmentNumber(2L, 1))
                .thenReturn(Optional.of(segment));
        when(phaseSegmentRepository.countByPhaseId(2L)).thenReturn(3);

        readingService.getPhaseSegment(userId, 2L, 1);

        verify(userProgressRepository)
                .existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 1L);
    }
}