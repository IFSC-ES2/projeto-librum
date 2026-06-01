package com.librum.service;

import com.librum.dto.PhaseReadingResponse;
import com.librum.dto.PhaseSegmentResponse;
import com.librum.model.Book;
import com.librum.model.Phase;
import com.librum.model.PhaseSegment;
import com.librum.repository.BookRepository;
import com.librum.repository.PhaseRepository;
import com.librum.repository.PhaseSegmentRepository;
import com.librum.repository.UserProgressRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReadingService {

    private final BookRepository bookRepository;
    private final PhaseRepository phaseRepository;
    private final PhaseSegmentRepository phaseSegmentRepository;
    private final UserProgressRepository userProgressRepository;
    private final PhaseUnlockService phaseUnlockService;

    public ReadingService(BookRepository bookRepository,
                          PhaseRepository phaseRepository,
                          PhaseSegmentRepository phaseSegmentRepository,
                          UserProgressRepository userProgressRepository,
                          PhaseUnlockService phaseUnlockService) {
        this.bookRepository = bookRepository;
        this.phaseRepository = phaseRepository;
        this.phaseSegmentRepository = phaseSegmentRepository;
        this.userProgressRepository = userProgressRepository;
        this.phaseUnlockService = phaseUnlockService;
    }

    public PhaseSegmentResponse getPhaseSegment(UUID userId, Long phaseId, int segmentNumber) {
        Phase phase = phaseRepository.findById(phaseId)
                .orElseThrow(() -> new EntityNotFoundException("Fase nao encontrada"));

        if (!phaseUnlockService.isPhaseUnlocked(userId, phase)) {
            throw new AccessDeniedException("Fase bloqueada para este usuario");
        }

        PhaseSegment segment = phaseSegmentRepository
                .findByPhaseIdAndSegmentNumber(phaseId, segmentNumber)
                .orElseThrow(() -> new EntityNotFoundException("Segmento nao encontrado"));

        int totalSegments = phaseSegmentRepository.countByPhaseId(phaseId);
        Book book = phase.getBook();

        return new PhaseSegmentResponse(
                segment.getSegmentNumber(),
                totalSegments,
                segment.getContent(),
                segment.getEstimatedMinutes(),
                phase.getTitle(),
                phase.getPhaseNumber(),
                book.getTitle(),
                book.getAuthor(),
                book.getGenre().getName(),
                book.getGenre().getSlug()
        );
    }

    public List<PhaseReadingResponse> getPhasesForGenre(UUID userId, Long genreId) {
        Book book = bookRepository.findByGenreId(genreId)
                .orElseThrow(() -> new EntityNotFoundException("Livro nao encontrado para este genero"));

        List<Phase> phases = phaseRepository.findByBookIdOrderByPhaseNumber(book.getId());

        return phases.stream().map(phase -> {
            boolean unlocked = phaseUnlockService.isPhaseUnlocked(userId, phase);
            boolean completed = userProgressRepository
                    .existsByUserIdAndPhaseIdAndIsCompletedTrue(userId, phase.getId());
            int totalSegments = phaseSegmentRepository.countByPhaseId(phase.getId());

            return new PhaseReadingResponse(
                    phase.getId(),
                    phase.getPhaseNumber(),
                    phase.getTitle(),
                    book.getTitle(),
                    book.getAuthor(),
                    totalSegments,
                    unlocked,
                    completed
            );
        }).toList();
    }
}
