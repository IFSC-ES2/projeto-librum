package com.librum.service;

import com.librum.dto.UserProgressSummaryResponse;
import com.librum.model.Book;
import com.librum.model.Genre;
import com.librum.model.Phase;
import com.librum.model.User;
import com.librum.repository.BookRepository;
import com.librum.repository.GenreRepository;
import com.librum.repository.PhaseRepository;
import com.librum.repository.UserProgressRepository;
import com.librum.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ProgressSummaryServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private GenreRepository genreRepository;
    @Mock private BookRepository bookRepository;
    @Mock private PhaseRepository phaseRepository;
    @Mock private UserProgressRepository userProgressRepository;

    @InjectMocks private ProgressSummaryService progressSummaryService;

    @Test
    void getSummary_contaFasesConcluidasPorGenero() {
        UUID userId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);
        user.setXp(60);
        user.setLevel(2);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Genre aventura = mock(Genre.class);
        when(aventura.getId()).thenReturn(1L);
        when(aventura.getName()).thenReturn("Aventura");
        when(aventura.getSlug()).thenReturn("aventura");
        when(genreRepository.findAll()).thenReturn(List.of(aventura));

        Book book = mock(Book.class);
        when(book.getId()).thenReturn(10L);
        when(bookRepository.findByGenreId(1L)).thenReturn(Optional.of(book));

        Phase fase1 = mock(Phase.class);
        when(fase1.getId()).thenReturn(1L);
        Phase fase2 = mock(Phase.class);
        when(fase2.getId()).thenReturn(2L);
        when(phaseRepository.findByBookIdOrderByPhaseNumber(10L)).thenReturn(List.of(fase1, fase2));

        when(userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 1L)).thenReturn(true);
        when(userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, 2L)).thenReturn(false);

        UserProgressSummaryResponse resposta = progressSummaryService.getSummary(userId);

        assertThat(resposta.xp()).isEqualTo(60);
        assertThat(resposta.level()).isEqualTo(2);
        assertThat(resposta.totalCompletedPhases()).isEqualTo(1);
        assertThat(resposta.byGenre()).hasSize(1);
        assertThat(resposta.byGenre().get(0).completedPhases()).isEqualTo(1);
        assertThat(resposta.byGenre().get(0).totalPhases()).isEqualTo(2);
    }

    @Test
    void getSummary_generoSemLivro_contaZero() {
        UUID userId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);
        user.setXp(0);
        user.setLevel(1);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Genre romance = mock(Genre.class);
        when(romance.getId()).thenReturn(2L);
        when(romance.getName()).thenReturn("Romance");
        when(romance.getSlug()).thenReturn("romance");
        when(genreRepository.findAll()).thenReturn(List.of(romance));

        when(bookRepository.findByGenreId(2L)).thenReturn(Optional.empty());

        UserProgressSummaryResponse resposta = progressSummaryService.getSummary(userId);

        assertThat(resposta.totalCompletedPhases()).isEqualTo(0);
        assertThat(resposta.byGenre().get(0).completedPhases()).isEqualTo(0);
        assertThat(resposta.byGenre().get(0).totalPhases()).isEqualTo(0);
    }
}
