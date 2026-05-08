package com.librum.controller;

import com.librum.dto.GenreResponse;
import com.librum.dto.PhaseReadingResponse;
import com.librum.dto.PhaseSegmentResponse;
import com.librum.model.User;
import com.librum.repository.GenreRepository;
import com.librum.repository.UserRepository;
import com.librum.service.ReadingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ReadingController {

    private final ReadingService readingService;
    private final GenreRepository genreRepository;
    private final UserRepository userRepository;

    public ReadingController(ReadingService readingService,
                             GenreRepository genreRepository,
                             UserRepository userRepository) {
        this.readingService = readingService;
        this.genreRepository = genreRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/genres")
    public ResponseEntity<List<GenreResponse>> listGenres() {
        List<GenreResponse> genres = genreRepository.findAll().stream()
                .map(g -> new GenreResponse(g.getId(), g.getName(), g.getSlug(), g.getIconEmoji(), g.getDescription()))
                .toList();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/genres/{genreId}/phases")
    public ResponseEntity<List<PhaseReadingResponse>> listPhases(
            @PathVariable Long genreId,
            @AuthenticationPrincipal String email) {
        UUID userId = getUserId(email);
        return ResponseEntity.ok(readingService.getPhasesForGenre(userId, genreId));
    }

    @GetMapping("/reading/{phaseId}/{segmentNumber}")
    public ResponseEntity<PhaseSegmentResponse> getSegment(
            @PathVariable Long phaseId,
            @PathVariable int segmentNumber,
            @AuthenticationPrincipal String email) {
        UUID userId = getUserId(email);
        return ResponseEntity.ok(readingService.getPhaseSegment(userId, phaseId, segmentNumber));
    }

    private UUID getUserId(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow();
    }
}
