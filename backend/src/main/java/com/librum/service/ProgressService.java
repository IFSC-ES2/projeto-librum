package com.librum.service;

import com.librum.model.Phase;
import com.librum.model.User;
import com.librum.model.UserProgress;
import com.librum.repository.PhaseRepository;
import com.librum.repository.PhaseSegmentRepository;
import com.librum.repository.UserProgressRepository;
import com.librum.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class ProgressService {

    private final UserProgressRepository userProgressRepository;
    private final PhaseRepository phaseRepository;
    private final PhaseSegmentRepository phaseSegmentRepository;
    private final UserRepository userRepository;

    public ProgressService(UserProgressRepository userProgressRepository,
                           PhaseRepository phaseRepository,
                           PhaseSegmentRepository phaseSegmentRepository,
                           UserRepository userRepository) {
        this.userProgressRepository = userProgressRepository;
        this.phaseRepository = phaseRepository;
        this.phaseSegmentRepository = phaseSegmentRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> markSegmentRead(UUID userId, Long phaseId, int segmentNumber) {
        Phase phase = phaseRepository.findById(phaseId)
                .orElseThrow(() -> new EntityNotFoundException("Fase nao encontrada"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario nao encontrado"));

        UserProgress progress = userProgressRepository
                .findByUserIdAndPhaseId(userId, phaseId)
                .orElseGet(() -> {
                    UserProgress p = new UserProgress();
                    p.setUser(user);
                    p.setPhase(phase);
                    return p;
                });

        progress.setLastSegmentRead(Math.max(progress.getLastSegmentRead(), segmentNumber));

        int totalSegments = phaseSegmentRepository.countByPhaseId(phaseId);
        boolean phaseCompleted = segmentNumber == totalSegments;

        if (phaseCompleted && !progress.isCompleted()) {
            progress.setCompleted(true);
            progress.setCompletedAt(LocalDateTime.now());
        }

        userProgressRepository.save(progress);

        boolean nextPhaseUnlocked = phaseCompleted;

        return Map.of(
                "lastSegmentRead", progress.getLastSegmentRead(),
                "phaseCompleted", progress.isCompleted(),
                "nextPhaseUnlocked", nextPhaseUnlocked
        );
    }
}
