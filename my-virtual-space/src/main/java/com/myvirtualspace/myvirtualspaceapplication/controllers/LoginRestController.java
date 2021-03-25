package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.dto.UserCredentials;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTAuthenticationResponse;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTUserDetails;
import com.myvirtualspace.myvirtualspaceapplication.secutity.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginRestController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("login")
    public ResponseEntity<JWTAuthenticationResponse> authenticateUser(@RequestBody UserCredentials loginRequest) {
        return ResponseEntity.ok(new JWTAuthenticationResponse(
                authenticationService.signIn(loginRequest),
                (JWTUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        ));
    }

    @PostMapping("registration")
    public ResponseEntity<JWTAuthenticationResponse> registrationUser(@RequestBody UserCredentials registrationRequest) {
        return ResponseEntity.ok(new JWTAuthenticationResponse(
                authenticationService.signUp(registrationRequest),
                (JWTUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        ));
    }

    @PostMapping("checkToken")
    public ResponseEntity<String> checkToken(@RequestBody String jwt) {
        return ResponseEntity.ok(authenticationService.checkToken(jwt));
    }

}