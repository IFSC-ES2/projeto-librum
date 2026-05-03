package com.librum.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        // Criando uma chave secreta e tempo de expiração falsos para o teste
        String secret = "chave-secreta-muito-segura-para-testes-unitarios-123456";
        long expiration = 3600000; // 1 hora
        
        jwtUtil = new JwtUtil(secret, expiration);
    }

    @Test
    void gerarToken_emailValido_tokenEhValido() {
        String email = "teste@librum.com";
        String token = jwtUtil.generateToken(email);

        boolean isValid = jwtUtil.validateToken(token);

        assertTrue(isValid);
    }

    @Test
    void gerarToken_emailValido_emailExtraidoCorretamente() {
        String email = "teste@librum.com";
        String token = jwtUtil.generateToken(email);

        String emailExtraido = jwtUtil.getEmailFromToken(token);

        assertEquals("teste@librum.com", emailExtraido);
    }
}
