package com.librum.controller;

import com.librum.dto.ProgressRequest;
import com.librum.repository.UserRepository;
import com.librum.model.User;
import com.librum.service.ProgressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/progress")
public class ProgressController {

    private final ProgressService progressService;
    private final UserRepository userRepository;

    public ProgressController(ProgressService progressService, UserRepository userRepository) {
        this.progressService = progressService;
        this.userRepository = userRepository;
    }

    @PostMapping("/mark-read")
    public ResponseEntity<Map<String, Object>> markRead(
            @Valid @RequestBody ProgressRequest request,
            @AuthenticationPrincipal String email) {
        UUID userId = userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow();
        Map<String, Object> result = progressService.markSegmentRead(
                userId, request.getPhaseId(), request.getSegmentNumber());
        return ResponseEntity.ok(result);
    }
}
