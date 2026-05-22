package com.librum.service;

import com.librum.model.User;
import com.librum.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class XpServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private XpService xpService;

    private UUID userId;
    private User user;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        user = new User();
        user.setId(userId);
        user.setName("Giuliano");
        user.setEmail("giuliano@librum.com");
        user.setXp(0);
        user.setLevel(1);
    }

    @Test
    void addXp_usuarioComXpZero_acumulaCorretamente() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        User resultado = xpService.addXp(userId, 15);

        assertEquals(15, resultado.getXp());
    }

    @Test
    void addXp_xpAcumuladoAbaixoLimiar_mantemNivel1() {
        user.setXp(49);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        // 49 + 0 XP = continua nível 1
        User resultado = xpService.addXp(userId, 0);

        assertEquals(1, resultado.getLevel());
    }

    @Test
    void addXp_atingeLimiar50Xp_incrementaNivelPara2() {
        user.setXp(45);
        user.setLevel(1);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        User resultado = xpService.addXp(userId, 10); // 45 + 10 = 55 XP

        assertEquals(55, resultado.getXp());
        assertEquals(2, resultado.getLevel()); // 55 / 50 + 1 = 2
    }

    @Test
    void addXp_nivelMaximo10_naoUltrapassaLimite() {
        user.setXp(500);
        user.setLevel(10);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        User resultado = xpService.addXp(userId, 50); // 500 + 50 = 550 XP

        assertEquals(10, resultado.getLevel()); // Math.min(10, ...) = 10
    }

    @Test
    void addXp_persisteNoUsuario_xpSalvoNoBancoComValorCorreto() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        when(userRepository.save(captor.capture())).thenAnswer(inv -> inv.getArgument(0));

        xpService.addXp(userId, 25);

        User salvo = captor.getValue();
        assertEquals(25, salvo.getXp());
    }
}
