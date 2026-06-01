package com.librum.service;

import com.librum.model.Phase;
import com.librum.repository.PhaseRepository;
import com.librum.repository.UserProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PhaseUnlockService {

    private final PhaseRepository phaseRepository;
    private final UserProgressRepository userProgressRepository;

    public PhaseUnlockService(PhaseRepository phaseRepository, UserProgressRepository userProgressRepository) {
        this.phaseRepository = phaseRepository;
        this.userProgressRepository = userProgressRepository;
    }

    public boolean isPhaseUnlocked(UUID userId, Phase phase) {
        if (phase.getPhaseNumber() == 1) {
            return true;
        }

        List<Phase> phases = phaseRepository.findByBookIdOrderByPhaseNumber(phase.getBook().getId());
        Phase previousPhase = phases.stream()
                .filter(p -> p.getPhaseNumber() == phase.getPhaseNumber() - 1)
                .findFirst()
                .orElse(null);

        if (previousPhase == null) {
            return false;
        }

        return userProgressRepository.existsByUserIdAndPhaseIdAndQuizCompletedTrue(userId, previousPhase.getId());
    }
}
