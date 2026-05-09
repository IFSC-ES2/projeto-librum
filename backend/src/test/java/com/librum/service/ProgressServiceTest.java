package com.librum.service;

import com.librum.model.Phase;
import com.librum.model.User;
import com.librum.model.UserProgress;
import com.librum.repository.PhaseRepository;
import com.librum.repository.PhaseSegmentRepository;
import com.librum.repository.UserProgressRepository;
import com.librum.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProgressServiceTest {

    @Mock
    private UserProgressRepository userProgressRepository;

    @Mock
    private PhaseRepository phaseRepository;

    @Mock
    private PhaseSegmentRepository phaseSegmentRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProgressService progressService;

    private UUID userId;
    private User user;
    private Phase fase1;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        user = new User();
        user.setId(userId);
        user.setName("Giuliano");
        user.setEmail("giuliano@librum.com");

        fase1 = new Phase();
        fase1.setId(1L);
        fase1.setPhaseNumber(1);
        fase1.setTitle("Fase 1: O Inicio da Aventura");
    }

    @Test
    void markSegmentRead_primeiroSegmento_criaProgressoNovo() {
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L)).thenReturn(Optional.empty());
        when(phaseSegmentRepository.countByPhaseId(1L)).thenReturn(4);

        ArgumentCaptor<UserProgress> captor = ArgumentCaptor.forClass(UserProgress.class);
        when(userProgressRepository.save(captor.capture())).thenAnswer(inv -> inv.getArgument(0));

        Map<String, Object> result = progressService.markSegmentRead(userId, 1L, 1);

        UserProgress salvo = captor.getValue();
        assertEquals(1, salvo.getLastSegmentRead());
        assertFalse(salvo.isCompleted());
        assertNull(salvo.getCompletedAt());

        assertEquals(1, result.get("lastSegmentRead"));
        assertEquals(false, result.get("phaseCompleted"));
        assertEquals(false, result.get("nextPhaseUnlocked"));
    }

    @Test
    void markSegmentRead_segmentoRepetido_mantemMaiorValor() {
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        UserProgress progressoExistente = new UserProgress();
        progressoExistente.setUser(user);
        progressoExistente.setPhase(fase1);
        progressoExistente.setLastSegmentRead(2); // leitor já estava no segmento 2

        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L))
                .thenReturn(Optional.of(progressoExistente));
        when(phaseSegmentRepository.countByPhaseId(1L)).thenReturn(4);
        when(userProgressRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Map<String, Object> result = progressService.markSegmentRead(userId, 1L, 1);

        // Math.max(2, 1) = 2, não deve regredir
        assertEquals(2, result.get("lastSegmentRead"));
        assertEquals(false, result.get("phaseCompleted"));
    }

    @Test
    void markSegmentRead_ultimoSegmento_marcaFaseComoConcluidaEAtribuiTimestamp() {
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L)).thenReturn(Optional.empty());
        when(phaseSegmentRepository.countByPhaseId(1L)).thenReturn(4);

        ArgumentCaptor<UserProgress> captor = ArgumentCaptor.forClass(UserProgress.class);
        when(userProgressRepository.save(captor.capture())).thenAnswer(inv -> inv.getArgument(0));

        Map<String, Object> result = progressService.markSegmentRead(userId, 1L, 4);

        UserProgress salvo = captor.getValue();
        assertTrue(salvo.isCompleted(), "isCompleted deve ser true ao ler o ultimo segmento");
        assertNotNull(salvo.getCompletedAt(), "completedAt deve ser preenchido");
        assertEquals(true, result.get("phaseCompleted"));
    }

    @Test
    void markSegmentRead_concluiFase_indicaDesbloqueioProximaFase() {
        when(phaseRepository.findById(1L)).thenReturn(Optional.of(fase1));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userProgressRepository.findByUserIdAndPhaseId(userId, 1L)).thenReturn(Optional.empty());
        when(phaseSegmentRepository.countByPhaseId(1L)).thenReturn(4);
        when(userProgressRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Map<String, Object> result = progressService.markSegmentRead(userId, 1L, 4);

        assertEquals(true, result.get("nextPhaseUnlocked"));
    }
}
