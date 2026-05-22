package com.librum.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.librum.dto.QuizQuestionResponse;
import com.librum.dto.QuizResultRequest;
import com.librum.dto.QuizResultResponse;
import com.librum.model.User;
import com.librum.repository.UserRepository;
import com.librum.security.JwtUtil;
import com.librum.service.QuizService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(QuizController.class)
@Import(com.librum.security.SecurityConfig.class)
public class QuizControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private QuizService quizService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void getQuiz_semAutenticacao_retorna403() throws Exception {
        // Spring Security sem AuthenticationEntryPoint retorna 403 por padrão
        mockMvc.perform(get("/quiz/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "giuliano@librum.com")
    void getQuiz_comAutenticacao_retornaListaSemCorrectOption() throws Exception {
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        user.setEmail("giuliano@librum.com");

        when(userRepository.findByEmail("giuliano@librum.com"))
                .thenReturn(Optional.of(user));

        List<QuizQuestionResponse> questoes = List.of(
            new QuizQuestionResponse(1L, 1L, "Qual o nome do protagonista?",
                "Jim Hawkins", "Long John Silver", "Capitão Smollett", "Billy Bones")
        );
        when(quizService.getQuestions(1L)).thenReturn(questoes);

        mockMvc.perform(get("/quiz/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].questionText").value("Qual o nome do protagonista?"))
                // correctOption NÃO deve estar presente na resposta JSON
                .andExpect(jsonPath("$[0].correctOption").doesNotExist());
    }

    @Test
    void submitQuiz_comRespostasValidas_retornaXpEarned() throws Exception {
        // Usa .with(user(...)) para garantir que o principal seja resolvido como String
        // pelo @AuthenticationPrincipal no QuizController
        String email = "giuliano@librum.com";
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        user.setEmail(email);

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        QuizResultResponse resposta = new QuizResultResponse(1, 1, 5, 5, 1, false);
        when(quizService.submitQuiz(any(UUID.class), eq(1L), anyList()))
                .thenReturn(resposta);

        QuizResultRequest.AnswerItem item = new QuizResultRequest.AnswerItem();
        item.setQuestionId(1L);
        item.setSelectedOption("A");
        QuizResultRequest body = new QuizResultRequest();
        body.setAnswers(List.of(item));

        mockMvc.perform(post("/quiz/1/submit")
                        // Replica o comportamento do JwtAuthenticationFilter:
                        // principal é a String do email (não UserDetails)
                        .with(authentication(new UsernamePasswordAuthenticationToken(email, null, List.of())))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.xpEarned").value(5))
                .andExpect(jsonPath("$.correctAnswers").value(1));
    }
}
