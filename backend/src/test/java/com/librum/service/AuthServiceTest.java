package com.librum.service;

import com.librum.dto.AuthResponse;
import com.librum.dto.LoginRequest;
import com.librum.dto.RegisterRequest;
import com.librum.exception.DuplicateEmailException;
import com.librum.model.User;
import com.librum.repository.UserRepository;
import com.librum.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(UUID.randomUUID());
        user.setName("Teste");
        user.setEmail("teste@librum.com");
        user.setPassword("hash123");
    }

    @Test
    void registrar_usuarioValido_retornaTokenJWT() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Teste");
        request.setEmail("teste@librum.com");
        request.setPassword("senha123");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword())).thenReturn("hash123");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtUtil.generateToken(user.getEmail())).thenReturn("token_jwt");

        AuthResponse response = authService.register(request);

        assertNotNull(response.getToken());
        assertEquals("token_jwt", response.getToken());
    }

    @Test
    void registrar_emailDuplicado_lancaDuplicateEmailException() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("teste@librum.com");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));

        assertThrows(DuplicateEmailException.class, () -> {
            authService.register(request);
        });
        
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registrar_senhaArmazenada_comHashBcrypt() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Teste");
        request.setEmail("teste@librum.com");
        request.setPassword("senha123");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword())).thenReturn("hash-gerado-pelo-bcrypt");
        when(userRepository.save(any(User.class))).thenReturn(user);

        authService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User capturedUser = userCaptor.getValue();
        assertEquals("hash-gerado-pelo-bcrypt", capturedUser.getPassword());
    }

    @Test
    void login_credenciaisCorretas_retornaTokenJWT() {
        LoginRequest request = new LoginRequest();
        request.setEmail("teste@librum.com");
        request.setPassword("senha123");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken(user.getEmail())).thenReturn("token_jwt");

        AuthResponse response = authService.login(request);

        assertNotNull(response.getToken());
        assertEquals("token_jwt", response.getToken());
    }

    @Test
    void login_senhaErrada_lancaBadCredentialsException() {
        LoginRequest request = new LoginRequest();
        request.setEmail("teste@librum.com");
        request.setPassword("senhaErrada");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPassword())).thenReturn(false);

        assertThrows(BadCredentialsException.class, () -> {
            authService.login(request);
        });
    }

    @Test
    void login_emailInexistente_lancaBadCredentialsException() {
        LoginRequest request = new LoginRequest();
        request.setEmail("naoexiste@librum.com");
        request.setPassword("senha123");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            authService.login(request);
        });
    }
}
