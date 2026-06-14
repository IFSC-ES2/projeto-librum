package com.librum.exception;

import org.junit.jupiter.api.Test;
import org.springframework.security.access.AccessDeniedException;

import static org.assertj.core.api.Assertions.assertThat;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleGenerico_retorna500ComMensagem() {
        var resposta = handler.handleGenerico(new RuntimeException("detalhe interno"));

        assertThat(resposta.getStatusCode().value()).isEqualTo(500);
        assertThat(resposta.getBody().get("message")).isEqualTo("Erro interno do servidor");
    }

    @Test
    void handleAccessDenied_retorna403ComMensagem() {
        var resposta = handler.handleAccessDenied(new AccessDeniedException("bloqueada"));

        assertThat(resposta.getStatusCode().value()).isEqualTo(403);
        assertThat(resposta.getBody().get("message")).isNotBlank();
    }
}
