package com.librum.service;

import com.librum.model.User;
import com.librum.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class XpService {

    private final UserRepository userRepository;

    public XpService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addXp(UUID userId, int xpAmount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario nao encontrado"));

        user.setXp(user.getXp() + xpAmount);
        user.setLevel(calculateLevel(user.getXp()));

        return userRepository.save(user);
    }

    public int calculateLevel(int totalXp) {
        return Math.min(10, totalXp / 50 + 1);
    }
}
