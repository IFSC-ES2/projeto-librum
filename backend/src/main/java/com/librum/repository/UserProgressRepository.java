package com.librum.repository;

import com.librum.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndPhaseId(UUID userId, Long phaseId);
    boolean existsByUserIdAndPhaseIdAndIsCompletedTrue(UUID userId, Long phaseId);
    boolean existsByUserIdAndPhaseIdAndQuizCompletedTrue(UUID userId, Long phaseId);
}
