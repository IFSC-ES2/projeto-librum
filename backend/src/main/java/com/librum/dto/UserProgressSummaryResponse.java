package com.librum.dto;

import java.util.List;

public record UserProgressSummaryResponse(
        int xp,
        int level,
        int totalCompletedPhases,
        List<GenreProgress> byGenre
) {
    public record GenreProgress(
            Long genreId,
            String genreName,
            String slug,
            int completedPhases,
            int totalPhases
    ) {}
}
