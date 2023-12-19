package com.exam.examserver.controller;

import com.exam.examserver.entity.User;
import com.exam.examserver.model.JwtRequest;
import com.exam.examserver.model.JwtResponse;
import com.exam.examserver.service.UserDetailsServiceImpl;
import com.exam.examserver.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Slf4j
@CrossOrigin("http://localhost:4200/")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    // Generate JWT Token
    @PostMapping("/generate-token")
    public ResponseEntity<JwtResponse> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticate(jwtRequest.getUserName(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            log.error("User not found {}", e.getMessage());
            throw new UsernameNotFoundException("User not found");
        } catch (Exception e) {
            log.error("Something went wrong", e.getMessage());
            throw new Exception("Something went wrong");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUserName());
        String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok().body(
                JwtResponse
                        .builder()
                        .token(token)
                        .build()
        );
    }

    // Get Current Logged In user Details
    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        return ResponseEntity.ok().body(
                (User) userDetailsService.loadUserByUsername(principal.getName())
        );
    }

    private void authenticate(String userName, String password) throws Exception {
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        } catch (DisabledException e) {
            log.error("User is disable {}", e.getMessage());
            throw new Exception("User is disable");
        } catch (BadCredentialsException e) {
            log.error("Invalid credentials {}", e.getMessage());
            throw new Exception("Invalid credentials");
        } catch (Exception e) {
            log.error("Something went wrong {}", e.getMessage());
            throw new Exception("Something went wrong");
        }
    }
}
