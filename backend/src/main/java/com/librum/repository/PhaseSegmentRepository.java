package com.librum.repository;

import com.librum.model.PhaseSegment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhaseSegmentRepository extends JpaRepository<PhaseSegment, Long> {
    Optional<PhaseSegment> findByPhaseIdAndSegmentNumber(Long phaseId, int segmentNumber);
    int countByPhaseId(Long phaseId);
}
