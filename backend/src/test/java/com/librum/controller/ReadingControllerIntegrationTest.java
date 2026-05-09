package com.librum.controller;

import com.librum.dto.PhaseSegmentResponse;
import com.librum.model.Genre;
import com.librum.model.User;
import com.librum.repository.GenreRepository;
import com.librum.repository.UserRepository;
import com.librum.security.JwtUtil;
import com.librum.service.ReadingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReadingController.class)
@Import(com.librum.security.SecurityConfig.class)
public class ReadingControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReadingService readingService;

    @MockBean
    private GenreRepository genreRepository;

    @MockBean
    private UserRepository userRepository;

    // JwtUtil mockado; validateToken retorna false por padrão
    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void listGenres_semAutenticacao_retorna200() throws Exception {
        when(genreRepository.findAll()).thenReturn(List.of(new Genre()));

        mockMvc.perform(get("/genres")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getSegment_semAutenticacao_retorna403() throws Exception {
        mockMvc.perform(get("/reading/1/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "giuliano@librum.com")
    void getSegment_comUsuarioAutenticado_faseDestravada_retorna200() throws Exception {
        String email = "giuliano@librum.com";
        UUID userId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);
        user.setEmail(email);

        PhaseSegmentResponse segmentoResponse = new PhaseSegmentResponse(
                1, 4, "Era uma vez um jovem chamado Jim Hawkins...",
                3, "Fase 1: O Inicio da Aventura", 1,
                "A Ilha do Tesouro", "Robert Louis Stevenson", "Aventura"
        );

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(user));
        when(readingService.getPhaseSegment(any(UUID.class), anyLong(), anyInt()))
                .thenReturn(segmentoResponse);

        mockMvc.perform(get("/reading/1/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.segmentNumber").value(1))
                .andExpect(jsonPath("$.phaseTitle").value("Fase 1: O Inicio da Aventura"))
                .andExpect(jsonPath("$.bookTitle").value("A Ilha do Tesouro"));
    }
}
