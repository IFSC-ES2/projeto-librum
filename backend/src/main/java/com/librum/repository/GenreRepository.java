package com.librum.repository;

import com.librum.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    Optional<Genre> findBySlug(String slug);
}