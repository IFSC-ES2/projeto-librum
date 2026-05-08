package com.librum.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phase_segments")
public class PhaseSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "phase_id", nullable = false)
    private Phase phase;

    @Column(name = "segment_number", nullable = false)
    private int segmentNumber;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "estimated_minutes", nullable = false)
    private int estimatedMinutes;

    public PhaseSegment() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Phase getPhase() { return phase; }
    public void setPhase(Phase phase) { this.phase = phase; }
    public int getSegmentNumber() { return segmentNumber; }
    public void setSegmentNumber(int segmentNumber) { this.segmentNumber = segmentNumber; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
}
