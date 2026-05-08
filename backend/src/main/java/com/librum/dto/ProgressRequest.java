package com.librum.dto;

import jakarta.validation.constraints.NotNull;

public class ProgressRequest {

    @NotNull
    private Long phaseId;

    @NotNull
    private Integer segmentNumber;

    public Long getPhaseId() { return phaseId; }
    public void setPhaseId(Long phaseId) { this.phaseId = phaseId; }
    public Integer getSegmentNumber() { return segmentNumber; }
    public void setSegmentNumber(Integer segmentNumber) { this.segmentNumber = segmentNumber; }
}
