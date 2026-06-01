package com.librum.repository;

import com.librum.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    Optional<UserProgress> findByUserIdAndPhaseId(UUID userId, Long phaseId);
    boolean existsByUserIdAndPhaseIdAndIsCompletedTrue(UUID userId, Long phaseId);
    boolean existsByUserIdAndPhaseIdAndQuizCompletedTrue(UUID userId, Long phaseId);

    @Query("SELECT up.phase.id FROM UserProgress up WHERE up.user.id = :userId AND up.quizCompleted = true")
    List<Long> findPhaseIdsByUserIdAndQuizCompletedTrue(@Param("userId") UUID userId);
}
