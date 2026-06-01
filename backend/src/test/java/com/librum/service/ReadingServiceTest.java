package com.librum.service;

import com.librum.dto.PhaseReadingResponse;
import com.librum.dto.PhaseSegmentResponse;
import com.librum.model.Book;
import com.librum.model.Genre;
import com.librum.model.Phase;
import com.librum.model.PhaseSegment;
import com.librum.repository.BookRepository;
import com.librum.repository.PhaseRepository;
import com.librum.repository.PhaseSegmentRepository;
import com.librum.repository.UserProgressRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ReadingServiceTest {

    @Mock private BookRepository bookRepository;
    @Mock private PhaseRepository phaseRepository;
    @Mock private PhaseSegmentRepository phaseSegmentRepository;
    @Mock private UserProgressRepository userProgressRepository;
    @Mock private PhaseUnlockService phaseUnlockService;

    @InjectMocks private ReadingService readingService;

    private UUID userId;
    private Genre genre;
    private Book book;
    private Phase fase1;
    private Phase fase2;
    private Phase fase3;
    private PhaseSegment segmento1;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        genre = mock(Genre.class);
        when(genre.getName()).thenReturn("Aventura");
        when(genre.getSlug()).thenReturn("aventura");

        book = mock(Book.class);
        when(book.getId()).thenReturn(100L);
        when(book.getTitle()).thenReturn("A Ilha do Tesouro");
        when(book.getAuthor()).thenReturn("Robert Louis Stevenson");
        when(book.getGenre()).thenReturn(genre);

        fase1 = new Phase();
        fase1.setId(1L);
        fase1.setPhaseNumber(1);
        fase1.setTitle("Fase 1: O Inicio da Aventura");
        fase1.setBook(book);

        fase2 = new Phase();
        fase2.setId(2L);
        fase2.setPhaseNumber(2);
        fase2.setTitle("Fase 2: A Bordo do Hispaniola");
        fase2.setBook(book);

        fase3 = new Phase();
        fase3.setId(3L);
        fase3.setPhaseNumber(3);
        fase3.setTitle("Fase 3: Segredos da Ilha");
        fase3.setBook(book);

        segmento1 = new PhaseSegment();
        segmento1.setId(1L);
        segmento1.setPhase(fase1);
        segmento1.setSegmentNumber(1);
        segmento1.setContent("Era uma vez um jovem chamado Jim Hawkins...");
        segmento1.setEstimatedMinutes(3);
    }

    @Test
    void getPhaseSegment_faseDestravada_retornaSegmentoCorreto() {
        when(phaseUnlockService.isPhaseUnlocked(any(), any())).thenReturn(true);
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(phaseSegmentRepository.findByPhaseIdAndSegmentNumber(1L, 1)).thenReturn(Optional.of(segmento1));
        when(phaseSegmentRepository.countByPhaseId(1L)).thenReturn(4);

        PhaseSegmentResponse response = readingService.getPhaseSegment(userId, 1L, 1);

        assertNotNull(response);
        assertEquals(1, response.segmentNumber());
        assertEquals(4, response.totalSegments());
        assertEquals("Era uma vez um jovem chamado Jim Hawkins...", response.content());
        assertEquals(3, response.estimatedMinutes());
        assertEquals("Fase 1: O Inicio da Aventura", response.phaseTitle());
        assertEquals(1, response.phaseNumber());
    }

    @Test
    void getPhaseSegment_faseTravada_lancaAccessDeniedException() {
        when(phaseRepository.findById(2L)).thenReturn(Optional.of(fase2));
        when(phaseUnlockService.isPhaseUnlocked(any(), any())).thenReturn(false);

        assertThrows(AccessDeniedException.class, () ->
                readingService.getPhaseSegment(userId, 2L, 1));

        verify(phaseSegmentRepository, never()).findByPhaseIdAndSegmentNumber(any(), anyInt());
    }

    @Test
    void getPhaseSegment_segmentoInexistente_lancaEntityNotFoundException() {
        when(phaseUnlockService.isPhaseUnlocked(any(), any())).thenReturn(true);
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(phaseSegmentRepository.findByPhaseIdAndSegmentNumber(1L, 99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () ->
                readingService.getPhaseSegment(userId, 1L, 99));
    }

    @Test
    void getPhasesForGenre_listaFases_retornaStatusDeDesbloqueioCorreto() {
        when(bookRepository.findByGenreId(10L)).thenReturn(Optional.of(book));
        when(phaseRepository.findByBookIdOrderByPhaseNumber(any())).thenReturn(List.of(fase1, fase2, fase3));
        when(phaseSegmentRepository.countByPhaseId(anyLong())).thenReturn(4);

        when(phaseUnlockService.isPhaseUnlocked(userId, fase1)).thenReturn(true);
        when(phaseUnlockService.isPhaseUnlocked(userId, fase2)).thenReturn(true);
        when(phaseUnlockService.isPhaseUnlocked(userId, fase3)).thenReturn(false);

        when(userProgressRepository.existsByUserIdAndPhaseIdAndIsCompletedTrue(userId, 1L)).thenReturn(true);
        when(userProgressRepository.existsByUserIdAndPhaseIdAndIsCompletedTrue(userId, 2L)).thenReturn(false);

        List<PhaseReadingResponse> fases = readingService.getPhasesForGenre(userId, 10L);

        assertEquals(3, fases.size());
        assertTrue(fases.get(0).isUnlocked(), "Fase 1 deve estar destravada");
        assertTrue(fases.get(1).isUnlocked(), "Fase 2 deve estar destravada");
        assertFalse(fases.get(2).isUnlocked(), "Fase 3 deve estar travada");
    }

    @Test
    void getPhasesForGenre_semProgresso_somenteFase1Destravada() {
        when(bookRepository.findByGenreId(10L)).thenReturn(Optional.of(book));
        when(phaseRepository.findByBookIdOrderByPhaseNumber(any())).thenReturn(List.of(fase1, fase2, fase3));
        when(phaseSegmentRepository.countByPhaseId(anyLong())).thenReturn(4);

        when(phaseUnlockService.isPhaseUnlocked(userId, fase1)).thenReturn(true);
        when(phaseUnlockService.isPhaseUnlocked(userId, fase2)).thenReturn(false);
        when(phaseUnlockService.isPhaseUnlocked(userId, fase3)).thenReturn(false);

        List<PhaseReadingResponse> fases = readingService.getPhasesForGenre(userId, 10L);

        assertEquals(3, fases.size());
        assertTrue(fases.get(0).isUnlocked());
        assertFalse(fases.get(1).isUnlocked());
        assertFalse(fases.get(2).isUnlocked());
    }
}
