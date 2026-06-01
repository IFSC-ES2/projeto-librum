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
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ProgressSummaryService {

    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final BookRepository bookRepository;
    private final PhaseRepository phaseRepository;
    private final UserProgressRepository userProgressRepository;

    public ProgressSummaryService(UserRepository userRepository,
                                  GenreRepository genreRepository,
                                  BookRepository bookRepository,
                                  PhaseRepository phaseRepository,
                                  UserProgressRepository userProgressRepository) {
        this.userRepository = userRepository;
        this.genreRepository = genreRepository;
        this.bookRepository = bookRepository;
        this.phaseRepository = phaseRepository;
        this.userProgressRepository = userProgressRepository;
    }

    public UserProgressSummaryResponse getSummary(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario nao encontrado"));

        Set<Long> phasesConcluidasIds = new HashSet<>(
                userProgressRepository.findPhaseIdsByUserIdAndQuizCompletedTrue(userId)
        );

        List<UserProgressSummaryResponse.GenreProgress> byGenre = new ArrayList<>();
        int totalCompleted = 0;

        for (Genre genre : genreRepository.findAll()) {
            Book book = bookRepository.findByGenreId(genre.getId()).orElse(null);
            int completed = 0;
            int total = 0;

            if (book != null) {
                List<Phase> phases = phaseRepository.findByBookIdOrderByPhaseNumber(book.getId());
                total = phases.size();
                for (Phase phase : phases) {
                    if (phasesConcluidasIds.contains(phase.getId())) {
                        completed++;
                    }
                }
            }

            totalCompleted += completed;
            byGenre.add(new UserProgressSummaryResponse.GenreProgress(
                    genre.getId(), genre.getName(), genre.getSlug(), completed, total));
        }

        return new UserProgressSummaryResponse(user.getXp(), user.getLevel(), totalCompleted, byGenre);
    }
}
