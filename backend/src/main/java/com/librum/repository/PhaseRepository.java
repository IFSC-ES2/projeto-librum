package com.librum.repository;

import com.librum.model.Phase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhaseRepository extends JpaRepository<Phase, Long> {
    List<Phase> findByBookIdOrderByPhaseNumber(Long bookId);
}
