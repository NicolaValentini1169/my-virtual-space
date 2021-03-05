package com.myvirtualspace.myvirtualspaceapplication.controllers;

import com.myvirtualspace.myvirtualspaceapplication.dto.UserCredentials;
import com.myvirtualspace.myvirtualspaceapplication.secutity.entities.JWTAuthenticationResponse;
import com.myvirtualspace.myvirtualspaceapplication.secutity.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> authenticateUser(@RequestBody UserCredentials loginRequest) {
        return ResponseEntity.ok(authenticationService.signIn(loginRequest));
    }

    @PostMapping("registration")
    public ResponseEntity<String> registrationUser(@RequestBody UserCredentials registrationRequest) {
        return ResponseEntity.ok(authenticationService.signUp(registrationRequest));
    }

    @PostMapping("checkToken")
    public ResponseEntity<String> checkToken(@RequestBody String jwt) {
        return ResponseEntity.ok(authenticationService.checkToken(jwt));
    }

}