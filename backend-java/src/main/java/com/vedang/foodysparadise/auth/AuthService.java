package com.vedang.foodysparadise.auth;

import com.vedang.foodysparadise.exception.AuthenticationException;
import com.vedang.foodysparadise.exception.ValidationException;
import com.vedang.foodysparadise.model.User;
import com.vedang.foodysparadise.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse signup(SignupRequest request) {
        userRepository.findByEmail(request.email()).ifPresent(existing -> {
            throw new ValidationException("User already exists");
        });

        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getId(), saved.getEmail());

        return new AuthResponse(toSummary(saved), token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new AuthenticationException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new AuthenticationException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getId(), user.getEmail());

        return new AuthResponse(toSummary(user), token);
    }

    private UserSummary toSummary(User user) {
        return new UserSummary(user.getId(), user.getEmail());
    }
}
